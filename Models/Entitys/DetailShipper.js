import { Sequelize, DataTypes } from "sequelize";
const DetailShipper = (sequelize) => sequelize.define('DetailShipper', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    drivingLicence:{
        type: DataTypes.STRING,
    },
    numberPlate : {
        type: DataTypes.STRING,
    }


})


export default DetailShipper;