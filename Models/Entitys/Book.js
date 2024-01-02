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
    percentDiscount : {
        type: DataTypes.FLOAT,
        defaultValue : 0
    },
    sales_number:{
        type: DataTypes.INTEGER,
    },
    publication_date:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    purchases : {
        type : DataTypes.INTEGER,
        defaultValue : 0
    },
    isFlashSale : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    timeFlashSale : {
        type : DataTypes.STRING,
        defaultValue : '0'
    },
    dateFlashSale : {
        type : DataTypes.DATE,
        defaultValue : null
    },
    nhaXB : {
        type : DataTypes.STRING,
    },
    languages : {
        type : DataTypes.STRING
    },
    weight : {
        type : DataTypes.STRING
    },
    size: {
        type : DataTypes.STRING
    },
    numPage :{
        type: DataTypes.INTEGER
    }
})


export default Book;