import { Sequelize, DataTypes } from "sequelize";
const Author = (sequelize) => sequelize.define('Author', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true, 
    } ,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age:{
      type: DataTypes.INTEGER,
      allowNull: false,  
    },
    address:{
      type: DataTypes.STRING,
    }
});

export default Author;