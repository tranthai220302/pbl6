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
    },
    distance: {
        type: DataTypes.FLOAT
    },
    priceShip: {
        type: DataTypes.FLOAT
    }
})


export default Shippemt;