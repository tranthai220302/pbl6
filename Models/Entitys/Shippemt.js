import { Sequelize, DataTypes } from "sequelize";
const Shippemt = (sequelize) => sequelize.define('Shippemt', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    start_address: {
        type: DataTypes.STRING
    },
    end_address:{
        type: DataTypes.STRING
    }
})


export default Shippemt;