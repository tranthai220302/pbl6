import { Sequelize, DataTypes } from "sequelize";
const Role = (sequelize) => sequelize.define('Role', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name :{
        type: DataTypes.STRING
    }
})


export default Role;