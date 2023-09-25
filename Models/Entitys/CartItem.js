import { Sequelize, DataTypes } from "sequelize";
const CarItem = (sequelize) => sequelize.define('CarItem', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER
    }


})


export default CarItem;