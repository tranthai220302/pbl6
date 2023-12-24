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
    },
    img : {
        type : DataTypes.STRING(1000),
        defaultValue : ''
    }
})


export default Review;