import { Sequelize, DataTypes } from "sequelize";
const Payment = (sequelize) => sequelize.define('Payment', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    }
})


export default Payment;