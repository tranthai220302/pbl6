import { Sequelize, DataTypes } from "sequelize";
const Message = (sequelize) => sequelize.define('Message', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text:{
        type: DataTypes.STRING,
    }


})


export default Message;