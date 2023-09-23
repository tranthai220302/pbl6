import dotenv from 'dotenv'
dotenv.config()
const configdb = {
    HOST: process.env.host,
    USER: process.env.user,
    PASSWORD: process.env.password,
    DB: process.env.db,
    dialect: process.env.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
export default configdb;
