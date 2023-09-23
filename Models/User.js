import { Sequelize, DataTypes } from "sequelize";
const User = (sequelize) => sequelize.define('User', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true, 
    } ,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password :{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar:{
      type: DataTypes.STRING
    }
});

export default User;