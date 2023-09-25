import { Sequelize, DataTypes } from "sequelize";
const Chat = (sequelize) => sequelize.define('Chat', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    topic: {
        type: DataTypes.STRING
    },


})


export default Chat;