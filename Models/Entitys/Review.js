import { Sequelize, DataTypes } from "sequelize";
const Review = (sequelize) => sequelize.define('Review', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    desc:{
        type: DataTypes.STRING,
        allowNull: false
    }
})


export default Review;