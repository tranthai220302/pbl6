import { Sequelize, DataTypes } from "sequelize";
const Chat = (sequelize) => sequelize.define('Chat', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    readBySeller: {
        type: DataTypes.BOOLEAN
      },
    readByBuyer: {
        type: DataTypes.BOOLEAN,
    },
    lastMessage: {
        type:DataTypes.STRING,
    },
})


export default Chat;