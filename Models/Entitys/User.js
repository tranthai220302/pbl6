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
    },
    avatar:{
      type: DataTypes.STRING(1000)
    },
    phone: {
      type: DataTypes.INTEGER
    },
    age : {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATEONLY, 
      allowNull: false
    }
    
});

export default User;