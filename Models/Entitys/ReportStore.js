import { Sequelize, DataTypes } from "sequelize";
const ReportStore = (sequelize) => sequelize.define('ReportStore', {
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

export default ReportStore;