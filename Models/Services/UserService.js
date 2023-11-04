import db from "../Entitys/index.js";
import { Op } from "sequelize";
import createError from "../../ultis/createError.js";
import Sequelize from "sequelize";
import {format} from 'date-fns'

export const updateUserService = async (data, id) =>{
    try {
        const userUpdate = await db.user.update(data, {
            where: {id}
        })
        if(!userUpdate || userUpdate[0] == 0) return createError(400, 'Update không thành công!')
        const user = await db.user.findOne({where : {id}})
        return {
            status: true,
            messgae: 'Update thanh cong!'
        };  
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

export const getPrecentCustomerNewService = async() =>{
    try {
        const today = new Date();
        const daysOfWeek = [];
        for(let i = 0; i < 7; i++){
            const day = new Date(today);
            day.setDate(today.getDate() - i);
            daysOfWeek.push(day);
        }
        const userByDate = [];
        const date = [];
        for(const day of daysOfWeek){
            const formattedDay = format(day, 'yyyy-MM-dd');
            const users = await db.user.findAll({
                where : {
                    [Op.and] : [
                        {RoleId : 1},
                        {createdAt: formattedDay}
                    ]
                }
            })
            userByDate.push(users.length);
            const formattedDay1 = format(day, 'MM-dd');
            date.push(formattedDay1)
        }
        return {
            data : userByDate,
            date: date
        };
    } catch (error) {
        return error;
    }
}
export const getPrecentCustomerByAgeService = async() =>{
    try {
        const age = [
            { minAge: 0, maxAge: 17, rangeName: ' 18-' },
            { minAge: 18, maxAge: 35, rangeName: '18-35' },
            { minAge: 36, maxAge: 100, rangeName: '36+' },
        ]
        const fetchData = async () => {
            const data = []
            const category = []
            for (const ageItem of age) {
                try {
                    const userByAge = await db.user.findAll({
                        where: {
                            [Op.and]: [
                                { age: { [Op.gte]: ageItem.minAge } },
                                { age: { [Op.lte]: ageItem.maxAge } },
                                { RoleId: 1 }
                            ],
                        }
                    });
                    data.push(userByAge.length);
                    category.push(ageItem.rangeName);
                } catch (error) {
                    console.error(error);
                }
            }
        
            return {
                data: data,
                category: category
            };
        };
        try {
            const data = await fetchData();
            return data;
        } catch (error) {
            return error;
        }
    } catch (error) {
        return error;
    }
}