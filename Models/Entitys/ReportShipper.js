import { Sequelize, DataTypes } from "sequelize";
const ReportShipper = (sequelize) => sequelize.define('ReportShipper', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true, 
    } ,
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
});

export default ReportShipper;