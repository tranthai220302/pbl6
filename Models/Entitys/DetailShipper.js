import { Sequelize, DataTypes } from "sequelize";
const DetailShipper = (sequelize) => sequelize.define('DetailShipper', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    drivingLience:{
        type: DataTypes.STRING,
    },
    numMobike : {
        type: DataTypes.STRING,
    }


})


export default DetailShipper;