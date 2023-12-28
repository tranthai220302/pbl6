import express from "express";
import db from "./Models/Entitys/index.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import routerUser from "./Routes/UserRoute.js";
import routerCart from "./Routes/CartRoute.js";
import routerOrder from "./Routes/OrderRoute.js";
import routerAuth from "./Routes/AuthRoute.js";
import routerBook from "./Routes/BookRoute.js";
import routerAuhtor from "./Routes/AuthorRoute.js";
import routerReview from "./Routes/ReviewRoute.js";
import routerVoucher from "./Routes/VoucherRoute.js";
import routerVoucherItem from "./Routes/VoucherItemRoute.js";
import routerMessages from "./Routes/MessageRoute.js";
import routerChat from "./Routes/ChatRoute.js";
import routerCategory from "./Routes/CategoryRoute.js";
import { Server } from "socket.io";
import routerReportStore from "./Routes/ReportStoreRoute.js";
import routerShippemt from "./Routes/ShippementRoute.js";
import routerReportShipper from "./Routes/ReportShipperRoute.js";
import path from "path";
import cron from 'node-cron'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config()
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const port = process.env.PORT
//Connect database
try {
    await db.sequelize.authenticate();
    console.log('Connection database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}
//setupFlashSale
cron.schedule('0 0 * * *', async () => {
  const currentDate = new Date();

  const expiredBooks = await db.book.update({
      isFlashSale : 1,
      timeFlashSale : '0',
      dateFlashSale : '0000-00-00'
  },{
      where: {
          dateFlashSale: { [Op.lt]: currentDate }
      }
  });
  console.log('Đã cập nhật sách đã hết hạn FlashSale.');
});
// await db.sequelize.sync({
//     alter: true,
//     logging : ()=>{}
// }).then(()=>{
//     console.log('Update database success')
// })
//api
app.use('/api/auth', routerAuth)
app.use('/api/book', routerBook)
app.use('/api/user', routerUser)
app.use('/api/cart', routerCart)
app.use('/api/order', routerOrder)
app.use('/api/author', routerAuhtor)
app.use('/api/review', routerReview)
app.use('/api/voucher', routerVoucher)
app.use('/api/voucherItem', routerVoucherItem)
app.use('/api/message', routerMessages)
app.use('/api/chat', routerChat)
app.use('/api/category', routerCategory)
app.use('/api/report', routerReportStore)
app.use('/api/shippemt',routerShippemt)
app.use('/api/reportShipper',routerReportShipper)
app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  console.log(err)
  return res.status(500).send(errorMessage);
})
const server = app.listen(port, ()=>{
  console.log(`Server is listening ${port}`)
})
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers)
  });

  socket.on("send-mes", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log(sendUserSocket)
      socket.to(sendUserSocket).emit("mes-receive", data);
    }
  });
});
