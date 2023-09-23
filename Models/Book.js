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
    sales_number:{
        type: DataTypes.INTEGER,
    },
    publication_date:{
        type: DataTypes.DATE,
        allowNull: false,
    }
})


export default Book;