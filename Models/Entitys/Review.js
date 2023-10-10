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
    },
    num_star : {
        type: DataTypes.INTEGER,
        defaultValue: 5
    }
})


export default Review;