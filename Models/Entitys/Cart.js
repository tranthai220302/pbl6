import { Sequelize, DataTypes } from "sequelize";
const Cart = (sequelize) => sequelize.define('Cart', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total_quantity: {
        type: DataTypes.INTEGER
    }


})


export default Cart;