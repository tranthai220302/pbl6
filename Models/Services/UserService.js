import db from "../Entitys/index.js";
import { Op, where } from "sequelize";
import createError from "../../ultis/createError.js";
import Sequelize from "sequelize";
import {addYears, format} from 'date-fns'
import sendRequestShipperByEmail from "../../ultis/sendRequestShipperByEmail.js";

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
export const getUsersByQueryService = async(filter, idRole, page) =>{
    try {
        const offset = (page - 1) * 8;
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
          const num = await db.user.count({
            attributes: { exclude: ['password'] },
            where: filter,
            include: usersInclude,
          })
          const users = await db.user.findAll({
            attributes: { exclude: ['password'] },
            where: filter,
            include: usersInclude,
            offset : offset,
            limit : 8
          });   
        if(users.length == 0) return createError(400, 'Không tìm thấy người dùng!')
        return {
            users,
            numPage : Math.ceil(num/8)
        };
    } catch (error) {
        return error;
    }
}
export const getUserByIdService = async(id) =>{
    try {
        console.log(id)
        const user = await db.user.findOne({
            where: { id },
            include: [
                {
                    model: db.storeRequest,
                    as: 'DetailStore',
                    attributes: { exclude: ['password'] },
                }
            ]
        });
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

export const ConfirmShipperService = async(idCustomer) =>{
    try {
        const check = await db.user.findOne({
            where : {
                [Op.and] : [
                    {id : idCustomer},
                    {RoleId : 1}
                ]
            }
        })
        if(!check) return createError(400, 'Không tìm thấy người dùng yêu cầu làm shipper')

        const updateRequest = await db.shipperRequest.update({
            isConfirm : true
        },{where : {customer_id : idCustomer}});
        if(updateRequest[0] == 0) return createError(400, 'Xác nhận không thành công1!');
        const updateShipper = await db.user.update(
            {RoleId : 3},
            {where : {id : idCustomer}}
        )
        if(updateShipper[0] == 0) return createError(400, 'Xác nhận không thành công!')
        return{
            messgae: 'Xác nhận thành công!'
        }
    } catch (error) {
        return error;
    }
}

export const sendRequireShipperService = async(filter)=>{
    try {
        const checkRequire = await db.shipperRequest.findOne({
            where : {customer_id : filter.customer_id}
        })
        if(checkRequire) return createError(400, 'Bạn đã gửi yêu cầu rồi !')
        const checkNumMobike = await db.shipperRequest.findOne({
            where : {
                numMobike :filter.numMobike
            }
        })
        if(checkNumMobike) return createError(400, 'Biển số xe đã tồn tại!')
        const createRequire = await db.shipperRequest.create(filter);
        if(!createRequire) return createError(400,'Gửi yêu cầu không thành công!');
        return createRequire;
    } catch (error) {
        return error;
    }
} 
export const getRequestShippersService = async()=>{
    try {
        const listRequest = await db.shipperRequest.findAll({
            where : {
                isConfirm : false
            },
            include : [
                {
                    model : db.user,
                    as : 'userShipper',
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

export const getNumberAdminService = async(req, res, next) =>{
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
        const book = await db.book.count()
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
export const cancleRequestStoreService = async(customer_id, message) =>{
    try {
        const cancel = await db.storeRequest.destroy({
            where : {
                customer_id
            }
        })
        if(cancel === 0) return createError(400, 'Từ chối không thành công!')
        const user = await db.user.findByPk(customer_id);
        if(!user) return createError(400, 'Không tìm thấy người dùng !');
        sendRequestByEmail(user, message)
        return {
            message : 'Từ chối thành công'
        }
    } catch (error) {
        return error;   
    }
}

export const cancleRequestShipperService = async(customer_id, message) =>{
    try {
        const cancel = await db.shipperRequest.destroy({
            where : {
                customer_id
            }
        })
        if(cancel === 0) return createError(400, 'Từ chối không thành công!')
        const user = await db.user.findByPk(customer_id);
        if(!user) return createError(400, 'Không tìm thấy người dùng !');
        sendRequestShipperByEmail(user, message)
        return {
            message : 'Từ chối thành công'
        }
    } catch (error) {
        return error;   
    }
}
export const getOrderByStateService = async(store_id, StateId) =>{
    try {
        const order= await db.order.findAll({
            where : {
                StateId : StateId,
                store_id
            },
            include : [
                {
                    model : db.user,
                    as : 'customer',
                    attributes: { exclude: ['password'] },
                },
                {
                    model : db.state,
                    attributes: ['status'],
                },
                {
                    model : db.book,
                    include : [
                        {
                            model : db.image,
                        }
                    ]
                },
            ]
        })
        return {
            order,
            number : order.length
        }
    } catch (error) {
        return error;
    }
}
export const workByStoreService = async(id) =>{
    try {
        const orderWaitCofirm = await getOrderByStateService(id, 1);
        const orderWaitShip = await getOrderByStateService(id, 2);
        const orderComplete = await getOrderByStateService(id, 5);
        const orderCancel = await getOrderByStateService(id, 6);
        const orderReturn = await getOrderByStateService(id, 7);
        const book = await db.book.findAll({
            where : {
                [Op.and] : [
                    {store_id : id},
                    {sales_number : 0}
                ]
            }
        })
        const book0 = {
            book,
            number : book.length
        }
        return {
            orderWaitCofirm,
            orderWaitShip,
            orderComplete,
            orderCancel,
            orderReturn,
            book
        }
    } catch (error) {
        return error;
    }
}
export const getStoreFlashSaleService = async(date) =>{
    try {
        const book = await db.book.findAll({
            where : {
                [Op.and] : [
                    {
                        dateFlashSale : date
                    },
                    {
                        isFlashSale : 0
                    }
                ]
            },
            include : [
                {
                    model : db.user,
                    attributes : {exclude : ['password']},
                    include : [
                        {
                            model : db.storeRequest,
                            as : 'DetailStore'
                        }
                    ]
                }
            ]
        })
        return book;
    } catch (error) {
        
    }
}

export const getShippersService = async() =>{
    try {
        const shippers = await db.shipperRequest.findAll({
            where: {
                isConfirm: 1
            },
            include : [
                {
                    model : db.user,
                    as : 'userShipper',
                    attributes: { exclude: ['password'] },
                }
            ]
        });
         if (shippers.length === 0) return createError(400, 'Không có shipper!');

        return shippers;
    } catch (error) {
        console.error(error);
        return error;
    }
}


export const getDetailShipperService = async(id) =>{
    try {
        const shippers = await db.shipperRequest.findAll({
            where: {
                [Op.and] : [
                    {
                        isConfirm: 1
                    },
                    {
                        customer_id : id
                    }
                ]
            },
            include : [
                {
                    model : db.user,
                    as : 'userShipper',
                    attributes: { exclude: ['password'] },
                }
            ]
        });
         if (shippers.length === 0) return createError(400, 'Không có shipper!');

        return shippers;
    } catch (error) {
        console.error(error);
        return error;
    }
}
