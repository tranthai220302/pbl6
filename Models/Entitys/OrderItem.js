import { Sequelize, DataTypes, INTEGER } from "sequelize";
const OrderItem = (sequelize) => sequelize.define('OrderItem', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price:{
        type: INTEGER,
        allowNull: false,
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})


export default OrderItem;