import { Sequelize, DataTypes } from "sequelize";
const Cart = (sequelize) => sequelize.define('Cart', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }


})


export default Cart;