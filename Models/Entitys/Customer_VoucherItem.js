import { Sequelize, DataTypes } from "sequelize";
const Customer_VoucherItem = (sequelize) => sequelize.define('Customer_VoucherItem', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
})


export default Customer_VoucherItem;