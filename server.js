import express from "express";
import db from "./Models/index.js";
const app = express();
try {
    await db.sequelize.authenticate();
    console.log('Connection database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
await db.sequelize.sync({
    force: true,
    logging : ()=>{}
}).then(()=>{
    console.log('Update database success')
})
app.listen(8080, ()=>{
    console.log('Server is listening 8080')
})
