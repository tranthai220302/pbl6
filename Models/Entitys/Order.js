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
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    priceStore : {
        type: DataTypes.INTEGER
    },
    priceAdmi : {
        type : DataTypes.INTEGER
    },
    addressCustomer : {
        type : DataTypes.STRING
    },
    addressStore : {
        type: DataTypes.STRING
    },
    priceFreeShip : {
        type : DataTypes.INTEGER
    },
    priceFreeVoucher : {
        type : DataTypes.INTEGER
    },
    priceShip : {
        type : DataTypes.INTEGER
    }
})


export default Order;