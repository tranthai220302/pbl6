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
import { Server } from "socket.io";
dotenv.config()
const app = express();
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
app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  console.log(err)
  return res.status(errorStatus).send(errorMessage);
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
global.OnlinerUser = new Map();
io.on("connection", (socket) =>{
  console.log(`${socket.id} kết nối tới server`)
  global.chatSocket = socket;
  socket.on('add-user', (userId)=>{
    OnlinerUser.set(userId, socket.id)
  });
  socket.on('send-mes', (data)=>{
    const sendUserSocket = OnlinerUser.get(data.to);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit('mes-receive', data.message)
    }
  })
})
