import db from "../Entitys/index.js";
import { Op, where } from "sequelize";
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
        const usersInclude = [
            {
              model: db.role,
              attributes: ['name'],
              where: { id: idRole },
            },
          ];
          
          if (idRole == 2) {
            usersInclude.push({
              model: db.storeRequest,
              as : 'DetailStore'
            });
          }
          
          const users = await db.user.findAll({
            attributes: { exclude: ['password'] },
            where: filter,
            include: usersInclude,
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
export const ConfirmStoreService = async(idCustomer) =>{
    try {
        const check = await db.user.findOne({
            where : {
                [Op.and] : [
                    {id : idCustomer},
                    {RoleId : 1}
                ]
            }
        })
        if(!check) return createError(400, 'Không tìm thấy người dùng yêu cầu mở cửa hàng')
        const updateRequest = await db.storeRequest.update({
            isConfirm : true
        },{where : {customer_id : idCustomer}});
        if(updateRequest[0] == 0) return createError(400, 'Xác nhận không thành công1!');
        const updateStore = await db.user.update(
            {RoleId : 2},
            {where : {id : idCustomer}}
        )
        if(updateStore[0] == 0) return createError(400, 'Xác nhận không thành công!')
        return{
            messgae: 'Xác nhận thành công!'
        }
    } catch (error) {
        return error;
    }
}
export const sendRequireStoreService = async(filter)=>{
    try {
        const checkRequire = await db.storeRequest.findOne({
            where : {customer_id : filter.customer_id}
        })
        if(checkRequire) return createError(400, 'Bạn đã gửi yêu cầu rồi !')
        const checkStoreName = await db.storeRequest.findOne({
            where : {
                nameStore :filter.nameStore
            }
        })
        if(checkStoreName) return createError(400, 'Tên cửa hàng đã tồn tại!')
        const createRequire = await db.storeRequest.create(filter);
        if(!createRequire) return createError(400,'Gửi yêu cầu không thành công!');
        return createRequire;
    } catch (error) {
        return error;
    }
} 
export const getRequestStoresService = async()=>{
    try {
        const listRequest = await db.storeRequest.findAll({
            where : {
                isConfirm : false
            },
            include : [
                {
                    model : db.user,
                    as : 'userStore',
                    attributes : {exclude : ['password']}
                }
            ]
        })
        if(listRequest.length == 0) return createError(400, 'Không có yêu cầu!');
        return listRequest;
    } catch (error) {
        return error;
    }
}
export const getNumberAdminService = async() =>
{
    try {
        const customer = await db.user.count({
            where : {
                RoleId : 1
            }
        })
        const store = await db.user.count({
            where : {
                RoleId : 2
            }
        })
        const shipper = await db.user.count({
            where : {
                RoleId : 3
            }
        })
        const book = await db.book.count();
        return {
            customer,
            store,
            shipper,
            book
        }
    } catch (error) {
        return error;
    }
}