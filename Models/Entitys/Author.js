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
    address:{
      type: DataTypes.STRING,
    },
    date_birth:{
      type: DataTypes.DATE,

    },
    date_death:{
      type: DataTypes.DATE,

    }
    
});

export default Author;