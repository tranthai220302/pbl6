import { Sequelize, DataTypes } from "sequelize";
const Rating = (sequelize) => sequelize.define('Rating', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    desc:{
        type: DataTypes.STRING
    },
    rating:{
        type: DataTypes.STRING,
    }
})


export default Rating;