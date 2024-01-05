import { Sequelize, DataTypes } from "sequelize";
const ShipperRequest = (sequelize) => sequelize.define('ShipperRequest', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    drivingLience:{
        type: DataTypes.STRING,
    },
    numMobike : {
        type : DataTypes.STRING,
    },
    image_drivingLience : {
        type : DataTypes.STRING,
    },
    isConfirm : {
        type: DataTypes.BOOLEAN
    }
})


export default ShipperRequest;