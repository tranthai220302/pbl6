import { Sequelize, DataTypes } from "sequelize";
const Order = (sequelize) => sequelize.define('Order', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total_price: {
        type: DataTypes.INTEGER
    },
    isPayment : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }


})


export default Order;