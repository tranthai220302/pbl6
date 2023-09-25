import { Sequelize, DataTypes } from "sequelize";
const State = (sequelize) => sequelize.define('State', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    }
})


export default State;