import { Sequelize, DataTypes } from "sequelize";
const Category = (sequelize) => sequelize.define('Category', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})


export default Category;