import db from "../Entitys/index.js";
import { Op } from "sequelize";
import createError from "../../ultis/createError.js";
import Sequelize from "sequelize";

export const updateUserService = async (data, id) =>{
    try {
        const userUpdate = await db.user.update(data, {
            where: {id}
        })
        if(!userUpdate || userUpdate[0] == 0) return createError(400, 'Update không thành công!')
        const user = await db.user.findOne({where : {id}})
        return userUpdate;  
    } catch (error) {
        return error;
    }
}
export const deleteUserService = async (id) =>{
    try {
        const deleteUser = await db.user.destroy({where : {id}})
        if(deleteUser == 0) return createError(400, 'Xoá tài khoản không thành công!')
        return true;
    } catch (error) {
        return error;
    }
}
export const getUsersByQueryService = async(filter, idRole) =>{
    try {
        const users = await db.user.findAll({
            attributes: { exclude: ['password'] },
            where: filter,
            include: [
                {
                    model: db.role,
                    attributes: ['name'],
                    where: { id: idRole },
                },
            ],
        });     
        if(users.length == 0) return createError(400, 'Không tìm thấy người dùng!')
        return users;
    } catch (error) {
        return error;
    }
}
export const getUserByIdService = async(id) =>{
    try {
        const user = await db.user.findOne({where:{id}})
        if(!user) return createError(400, 'Không tìm thấy người dùng!')
        return user;
    } catch (error) {
        return error;
    }
}
