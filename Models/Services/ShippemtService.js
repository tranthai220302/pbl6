import db from "../Entitys/index.js";
import createError from "../../ultis/createError.js";
import Sequelize from "sequelize";
import { distance } from "../../ultis/distance.js";
import { Op, where } from "sequelize";

export const createShippemtService = async(orderId, shipper_Id) =>{
    try {
        // Kiểm tra trạng thái của đơn hàng trước khi tạo shipment
        const order = await db.order.findOne({ where: { id: orderId } });

        if (!order || order.StateId !== 2) {
            return createError(400, 'Không thể nhận đơn hàng!');
        }

        const store_id = order.store_id;
        const store = await db.user.findOne({ where: { id: store_id}})

        const customer_id = order.customer_id;
        const customer = await db.user.findOne({ where: { id: customer_id}})

        const shippemt = await db.shippemt.create({
            start_address : store.address,
            end_address : customer.address,
            OrderId : orderId,
            shipperId: shipper_Id
        })
        
    
        if (!shippemt) return createError(400, 'Đơn hàng chưa có ai nhận!')

        const update_order = await db.order.update(
            {StateId: 3},
            {where: {id: orderId}}
        )

        if (!update_order) {
            return createError(400, 'Không thể cập nhật trạng thái đơn hàng!');
        }

        return {
            message: 'Đã nhận đơn hàng!',
            shippemt
            
        }    
    } catch (error) {
        return error;   
    }
}

export const update_state_successfulService = async(id) =>{
    try {
        
        const order = await db.order.findOne({ where: { id: id } });

        if (!order || order.StateId !== 3) {
            return createError(400, 'Đơn hàng chưa được vận chuyển!');
        }

        let update_order = await db.order.update(
            {StateId: 4},
            {where: {id: id}}
        )

        if (order.isPayment !=1) {
            update_order = await db.order.update(
                {isPayment: 1},
                {where: {id: id}}
            )
        }

        if (!update_order) {
            return createError(400, 'Không thể cập nhật trạng thái đơn hàng!');
        }

        return {
            message: 'Đơn hàng đã giao thành công!',
            update_order,
        }    
    } catch (error) {
        return error;   
    }
}

export const update_state_failedService = async(id) =>{
    try {
        
        const order = await db.order.findOne({ where: { id: id } });

        if (!order || order.StateId !== 3) {
            return createError(400, 'Đơn hàng chưa được vận !');
        }

        const update_order = await db.order.update(
            {StateId: 5},
            {where: {id: id}}
        )

        if (!update_order) {
            return createError(400, 'Không thể cập nhật trạng thái đơn hàng!');
        }

        return {
            message: 'Giao hàng không thành công!',
            update_order,
        }    
    } catch (error) {
        return error;   
    }
}

export const getOrdersService = async() =>{
    try {
        const orders = await db.order.findAll({
            where: {
                StateId: 2
            },
            include : [
                {
                    model : db.user,
                    as : 'customer',
                    attributes: { exclude: ['password'] },
                },
                {
                    model : db.user,
                    as : 'store',
                    attributes: { exclude: ['password'] },
                    include : [
                        {
                            model : db.storeRequest,
                            as : 'DetailStore'
                        }
                    ]
                },
                {
                    model : db.state,
                    attributes: ['status'],
                },
                {
                    model : db.book,
                },
            ]
        });
         // Kiểm tra nếu không có shipment nào được tìm thấy
         if (orders.length === 0) return createError(400, 'Không có đơn hàng!');

        return orders;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getOrdersByShipperService = async(id) =>{
    try {
        const orders = await db.shippemt.findAll({
            where: {
                shipperId: id
            },
            include: [
                {
                    model: db.order,
                    include : [
                        {
                            model : db.user,
                            as : 'customer',
                            attributes: { exclude: ['password'] },
                        },
                        {
                            model : db.user,
                            as : 'store',
                            attributes: { exclude: ['password'] },
                            include : [
                                {
                                    model : db.storeRequest,
                                    as : 'DetailStore'
                                }
                            ]
                        },
                        {
                            model : db.state,
                            attributes: ['status'],
                        },
                        {
                            model : db.book,
                        },
                    ]
                }                
            ]
        });

        // Kiểm tra nếu không có shipment nào được tìm thấy
        if (orders.length === 0) return createError(400, 'Không có đơn hàng!');
        return orders;
    } catch (error) {
        console.error(error);
        return error;
    }
}


export const getOrdersDeliveringService = async(id) =>{
    try {
        const orders = await db.shippemt.findAll({
            where: {
                shipperId: id
            },
            include: [
                {
                    model: db.order,
                    where: {
                        StateId: 3
                    },
                    include : [
                        {
                            model : db.user,
                            as : 'customer',
                            attributes: { exclude: ['password'] },
                        },
                        {
                            model : db.user,
                            as : 'store',
                            attributes: { exclude: ['password'] },
                            include : [
                                {
                                    model : db.storeRequest,
                                    as : 'DetailStore'
                                }
                            ]
                        },
                        {
                            model : db.state,
                            attributes: ['status'],
                        },
                        {
                            model : db.book,
                        }
                    ]
                }
            ]
        });

        // Kiểm tra nếu không có shipment nào được tìm thấy
        if (orders.length === 0) return createError(400, 'Không có đơn hàng!');
        return orders;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getOrderCompleteService = async(id) =>{
    try {

        const orders = await db.shippemt.findAll({
            where: {
                shipperId: id
            },
            include: [
                {
                    model: db.order,
                    where: {
                        [Op.or]: [
                            { StateId: 4 },
                            { StateId: 5 }
                        ]
                    },
                    include : [
                        {
                            model : db.user,
                            as : 'customer',
                            attributes: { exclude: ['password'] },
                        },
                        {
                            model : db.user,
                            as : 'store',
                            attributes: { exclude: ['password'] },
                            include : [
                                {
                                    model : db.storeRequest,
                                    as : 'DetailStore'
                                }
                            ]
                        },
                        {
                            model : db.state,
                            attributes: ['status'],
                        },
                        {
                            model : db.book,
                        },
                    ]
                }
            ],
            order: [
                [db.order, 'updatedAt', 'DESC'] // Sắp xếp theo trường updatedAt của đơn hàng, thay 'createdAt' bằng tên trường thực tế nếu khác
            ]
        });
        
        return orders;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const totalPriceShipperService = async (shipper_id, month) => {
    try {
        const shipmentIds = await db.shippemt.findAll({
            where: {
                shipperId: shipper_id // Thay shipperId bằng giá trị cần tìm kiếm
        },
            attributes: ['OrderId'] // Chỉ lấy trường orderId
        })

        // Lấy ra một mảng các orderId từ danh sách shipmentIds
        const orderIds = shipmentIds.map(shipment => shipment.OrderId)
        
        // Tìm danh sách các order từ danh sách orderIds từ bảng order
        const satistical = await db.order.findAll({
            where : {
                [Op.and] : [
                    {id: orderIds},
                    {isPayment : 1},
                    Sequelize.literal(`MONTH(createdAt) = ${month}`),
                ]
            }
        })

        // Tính tổng giá trị của priceShip từ tất cả các đơn hàng tìm được
        let total = 0;
        satistical.map((item)=>{
            total += item.priceShip
        })
        return total
    } catch (error) {
        return error;
    }
}

export const PriceShipperService = async (shipper_id) => {
    try {
        const shipmentIds = await db.shippemt.findAll({
            where: {
                shipperId: shipper_id // Thay shipperId bằng giá trị cần tìm kiếm
        },
            attributes: ['OrderId'] // Chỉ lấy trường orderId
        })
        
        // Lấy ra một mảng các orderId từ danh sách shipmentIds
        const orderIds = shipmentIds.map(shipment => shipment.OrderId)
        
        // Tìm danh sách các order từ danh sách orderIds từ bảng order
        const satistical = await db.order.findAll({
            where : {
                [Op.and] : [
                    {id: orderIds},
                    {isPayment : 1}
                ]
            }
        })

        // Tính tổng giá trị của priceShip từ tất cả các đơn hàng tìm được
        let total = 0;
        satistical.map((item)=>{
            total += item.priceShip
        })
        return total;
    } catch (error) {
        return error;
    }
}

export const revenueDateByShipperService = async (date, month, year, shipper_id) =>{
    try {
        const shipmentIds = await db.shippemt.findAll({
            where: {
                shipperId: shipper_id // Thay shipperId bằng giá trị cần tìm kiếm
        },
            attributes: ['OrderId'] // Chỉ lấy trường orderId
        })
        
        // Lấy ra một mảng các orderId từ danh sách shipmentIds
        const orderIds = shipmentIds.map(shipment => shipment.OrderId)
        
        const orders = await db.order.findAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`
                        DAY(createdAt) = ${date} AND
                        MONTH(createdAt) = ${month} AND
                        YEAR(createdAt) = ${year}
                    `),
                    {id: orderIds},
                    {isPayment : 1}
                ]
            }
        });
        let total = 0;
        orders.map((item)=>{
            item.priceShip ? total += item.priceShip : total += 0;
        })

        return total;
    } catch (error) {
        return error;
    }
}

export const revenueShipperByMonthService = async (shipper_id, targetMonth) => {
    try {
        const date = new Date();
        const currentMonth = date.getMonth() + 1; // Lấy tháng hiện tại
        const currentYear = date.getFullYear();

        // Tính toán tháng cần xem trong phạm vi 12 tháng gần nhất
        const monthsAgo = currentMonth - targetMonth;
        const targetYear = monthsAgo >= 0 ? currentYear : currentYear - 1;
        const monthToView = monthsAgo >= 0 ? targetMonth : 12 + monthsAgo;

        const currentDate = new Date(targetYear, targetMonth, 0);
        const numDate = currentDate.getDate();

        const data = [];
        const dateTitle = [];


        if (monthToView > 0 && monthToView < 13) {
            for (let i = 1; i <= numDate; i++) {
                const totalByDate = await revenueDateByShipperService(i, targetMonth, targetYear, shipper_id);
                data.push(totalByDate);
                dateTitle.push(i);
            }
            const total = await totalPriceShipperService(shipper_id, targetMonth);
            return {
                total,
                data,
                dateTitle
            };
        }
        return createError(400, 'Tháng không chính xác!');
    } catch (error) {
        return error;
    }
};

export const OrderShipperService = async (shipper_id, month) => {
    try {
        const shipmentIds = await db.shippemt.findAll({
            where: {
                shipperId: shipper_id // Thay shipperId bằng giá trị cần tìm kiếm
        },
            attributes: ['OrderId'] // Chỉ lấy trường orderId
        })
        
        // Lấy ra một mảng các orderId từ danh sách shipmentIds
        const orderIds = shipmentIds.map(shipment => shipment.OrderId)
        
        // Tìm danh sách các order từ danh sách orderIds từ bảng order
        const satistical = await db.order.findAll({
            where : {
                [Op.and] : [
                    {id: orderIds},
                    Sequelize.literal(`MONTH(createdAt) = ${month}`),
                ]
            }
        })

        // Tính tổng giá trị của priceShip từ tất cả các đơn hàng tìm được
        return satistical.length
    } catch (error) {
        return error;
    }
}


export const OrderByDateByShipperService = async (date, month, year, shipper_id) =>{
    try {

        const shipmentIds = await db.shippemt.findAll({
            where: {
                shipperId: shipper_id // Thay shipperId bằng giá trị cần tìm kiếm
        },
            attributes: ['OrderId'] // Chỉ lấy trường orderId
        })
        
        // Lấy ra một mảng các orderId từ danh sách shipmentIds
        const orderIds = shipmentIds.map(shipment => shipment.OrderId)
        
        const orders = await db.order.findAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`
                        DAY(createdAt) = ${date} AND
                        MONTH(createdAt) = ${month} AND
                        YEAR(createdAt) = ${year}
                    `),
                    { id: orderIds},
                ]
            }
        });
        return orders.length;
    } catch (error) {
        return error;
    }
}


export const OrderShipperByMonthService = async (shipper_id, targetMonth) => {
    try {
        const date = new Date();
        const currentMonth = date.getMonth() + 1; // Lấy tháng hiện tại
        const currentYear = date.getFullYear();

        // Tính toán tháng cần xem trong phạm vi 12 tháng gần nhất
        const monthsAgo = currentMonth - targetMonth;
        const targetYear = monthsAgo >= 0 ? currentYear : currentYear - 1;
        const monthToView = monthsAgo >= 0 ? targetMonth : 12 + monthsAgo;

        const currentDate = new Date(targetYear, targetMonth, 0);
        const numDate = currentDate.getDate();

        const data = [];
        const dateTitle = [];


        if (monthToView > 0 && monthToView < 13) {
            for (let i = 1; i <= numDate; i++) {
                const totalByDate = await OrderByDateByShipperService(i, targetMonth, targetYear, shipper_id);
                data.push(totalByDate);
                dateTitle.push(i);
            }
            
            const total = await OrderShipperService(shipper_id, targetMonth);
            return {
                total,
                data,
                dateTitle
            };
        }
        return createError(400, 'Tháng không chính xác!');
    } catch (error) {
        return error;
    }
};



export const updateShipperService = async (data1, data2, id) =>{
    try {

        const shipperUpdate = await db.user.update(data1, {
            where: {id}
        })

        const shipperUpdate2 = await db.shipperRequest.update(data2, {
            where: {customer_id: id}
        })

        if(!shipperUpdate || shipperUpdate[0] == 0) return createError(400, 'Update không thành công!')
        
        return {
            shipperUpdate,
            shipperUpdate2
        };  
    } catch (error) {
        return error;
    }
}

export const OrderSuccessfullShipperService = async (shipper_id, month) => {
    try {
        const shipmentIds = await db.shippemt.findAll({
            where: {
                shipperId: shipper_id // Thay shipperId bằng giá trị cần tìm kiếm
        },
            attributes: ['OrderId'] // Chỉ lấy trường orderId
        })

        const orders = shipmentIds.length;
        
        // Lấy ra một mảng các orderId từ danh sách shipmentIds
        const orderIds = shipmentIds.map(shipment => shipment.OrderId)
        
        // Tìm danh sách các order từ danh sách orderIds từ bảng order
        const satistical = await db.order.findAll({
            where : {
                [Op.and] : [
                    {id: orderIds},
                    {isPayment : 1},
                    {StateId: 4},
                    Sequelize.literal(`MONTH(createdAt) = ${month}`),
                ]
            }
        })

        // Tính tổng giá trị của priceShip từ tất cả các đơn hàng tìm được
        return satistical.length
    } catch (error) {
        return error;
    }
}

export const OrderSuccessfullDateByShipperService = async (date, month, year, shipper_id) =>{
    try {
        const shipmentIds = await db.shippemt.findAll({
            where: {
                shipperId: shipper_id // Thay shipperId bằng giá trị cần tìm kiếm
        },
            attributes: ['OrderId'] // Chỉ lấy trường orderId
        })
        
        // Lấy ra một mảng các orderId từ danh sách shipmentIds
        const orderIds = shipmentIds.map(shipment => shipment.OrderId)
        
        const orders = await db.order.findAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`
                        DAY(createdAt) = ${date} AND
                        MONTH(createdAt) = ${month} AND
                        YEAR(createdAt) = ${year}
                    `),
                    {id: orderIds},
                    {isPayment : 1},
                    {StateId: 4}
                ]
            }
        });
        const total = orders.length

        return total;
    } catch (error) {
        return error;
    }
}

export const OrderSuccessfullShipperByMonthService = async (shipper_id, targetMonth) => {
    try {
        const date = new Date();
        const currentMonth = date.getMonth() + 1; // Lấy tháng hiện tại
        const currentYear = date.getFullYear();

        // Tính toán tháng cần xem trong phạm vi 12 tháng gần nhất
        const monthsAgo = currentMonth - targetMonth;
        const targetYear = monthsAgo >= 0 ? currentYear : currentYear - 1;
        const monthToView = monthsAgo >= 0 ? targetMonth : 12 + monthsAgo;

        const currentDate = new Date(targetYear, targetMonth, 0);
        const numDate = currentDate.getDate();

        const data = [];
        const dateTitle = [];


        if (monthToView > 0 && monthToView < 13) {
            for (let i = 1; i <= numDate; i++) {
                const totalByDate = await OrderSuccessfullDateByShipperService(i, targetMonth, targetYear, shipper_id);
                data.push(totalByDate);
                dateTitle.push(i);
            }
            
            const total = await OrderSuccessfullShipperService(shipper_id, targetMonth);
            return {
                total,
                data,
                dateTitle
            };
        }
        return createError(400, 'Tháng không chính xác!');
    } catch (error) {
        return error;
    }
};


export const OrderFailedByShipperService = async (shipper_id, month) =>{
    try {

        const shipmentIds = await db.shippemt.findAll({
            where: {
                shipperId: shipper_id // Thay shipperId bằng giá trị cần tìm kiếm
        },
            attributes: ['OrderId'] // Chỉ lấy trường orderId
        })
        
        // Lấy ra một mảng các orderId từ danh sách shipmentIds
        const orderIds = shipmentIds.map(shipment => shipment.OrderId)
        
        const orderfailed = await db.order.findAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`
                        MONTH(createdAt) = ${month}
                    `),
                    { id: orderIds},
                    { StateId: 5}
                ]
            }
        });

        return orderfailed.length
    } catch (error) {
        return error;
    }
}


export const OrderFailedDateByShipperService = async (date, month, year, shipper_id) =>{
    try {
        const shipmentIds = await db.shippemt.findAll({
            where: {
                shipperId: shipper_id // Thay shipperId bằng giá trị cần tìm kiếm
        },
            attributes: ['OrderId'] // Chỉ lấy trường orderId
        })
        
        // Lấy ra một mảng các orderId từ danh sách shipmentIds
        const orderIds = shipmentIds.map(shipment => shipment.OrderId)
        
        const orders = await db.order.findAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`
                        DAY(createdAt) = ${date} AND
                        MONTH(createdAt) = ${month} AND
                        YEAR(createdAt) = ${year}
                    `),
                    {id: orderIds},
                    {StateId: 5}
                ]
            }
        });
        const total = orders.length

        return total;
    } catch (error) {
        return error;
    }
}

export const OrderFailedShipperByMonthService = async (shipper_id, targetMonth) => {
    try {
        const date = new Date();
        const currentMonth = date.getMonth() + 1; // Lấy tháng hiện tại
        const currentYear = date.getFullYear();

        // Tính toán tháng cần xem trong phạm vi 12 tháng gần nhất
        const monthsAgo = currentMonth - targetMonth;
        const targetYear = monthsAgo >= 0 ? currentYear : currentYear - 1;
        const monthToView = monthsAgo >= 0 ? targetMonth : 12 + monthsAgo;

        const currentDate = new Date(targetYear, targetMonth, 0);
        const numDate = currentDate.getDate();

        const data = [];
        const dateTitle = [];


        if (monthToView > 0 && monthToView < 13) {
            for (let i = 1; i <= numDate; i++) {
                const totalByDate = await OrderFailedDateByShipperService(i, targetMonth, targetYear, shipper_id);
                data.push(totalByDate);
                dateTitle.push(i);
            }
            
            const total = await OrderFailedByShipperService(shipper_id, targetMonth);
            return {
                total,
                data,
                dateTitle
            };
        }
        return createError(400, 'Tháng không chính xác!');
    } catch (error) {
        return error;
    }
};
