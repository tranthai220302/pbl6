import { Sequelize, DataTypes } from "sequelize";
const DetailStore = (sequelize) => sequelize.define('DetailStore', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameStore:{
        type: DataTypes.STRING,
    },
    descStore : {
        type: DataTypes.STRING,
    }


})


export default DetailStore;