import express from "express";
import db from "./Models/Entitys/index.js";
import routerAuth from "./Routes/AuthRoute.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
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
app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
})
app.listen(port, ()=>{
    console.log(`Server is listening ${port}`)
})
