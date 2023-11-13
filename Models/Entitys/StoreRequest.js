import { Sequelize, DataTypes } from "sequelize";
const StoreRequest = (sequelize) => sequelize.define('StoreRequest', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameStore:{
        type: DataTypes.STRING,
    },
    descStore : {
        type : DataTypes.STRING,
    },
    isConfirm : {
        type: DataTypes.BOOLEAN
    }
})


export default StoreRequest;