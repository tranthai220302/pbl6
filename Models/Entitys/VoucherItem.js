import { Sequelize, DataTypes } from "sequelize";
const VoucherItem = (sequelize) => sequelize.define('VoucherItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discountValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    discountType: {
        type: DataTypes.ENUM('percent', 'amount'),
        allowNull: false,
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    codition :{
       type: DataTypes.INTEGER,
       allowNull: false 
    },
    quantity : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isExpired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});



export default VoucherItem;