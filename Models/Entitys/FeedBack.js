import { Sequelize, DataTypes } from "sequelize";
const FeedBack = (sequelize) => sequelize.define('FeedBack', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    desc:{
        type: DataTypes.STRING,
        allowNull: false
    },
})


export default FeedBack;