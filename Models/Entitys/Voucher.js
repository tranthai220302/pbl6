import { Sequelize, DataTypes } from "sequelize";
const Voucher = (sequelize) => sequelize.define('Voucher', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
})


export default Voucher;