import { Sequelize, DataTypes } from "sequelize";
const Voucher = (sequelize) => sequelize.define('Voucher', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    discount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    expiry_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    is_Expired:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})


export default Voucher;