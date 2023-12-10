import { Sequelize, DataTypes } from "sequelize";
const Book = (sequelize) => sequelize.define('Book', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    priceSale : {
        type: DataTypes.FLOAT,
        defaultValue : 0
    },
    sales_number:{
        type: DataTypes.INTEGER,
    },
    publication_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    purchases : {
        type : DataTypes.INTEGER,
        defaultValue : 0
    },
    isFlashSale : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    }
})


export default Book;