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
            }
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
                    model: db.order
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
                    }
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
                    }
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
        return total;
    } catch (error) {
        return error;
    }
}

export const drawPrecentSatiscalService = async(month) =>{
    try {
        const satisticalShipper = [];
        const category = []
        const shipper = await db.user.findAll({
            where : {
                RoleId : 3
            },
        })
        console.log(shipper)
        for (const item of shipper) {
            const satistical = await totalPriceShipperService(item.id, month);
            if(satistical instanceof Error) return satistical;
            satisticalShipper.push(satistical);
            category.push(item.lastName + item.firstName)
        }
        return {
            shipper : satisticalShipper,
            category
        }
    } catch (error) {
        return error;   
    }
}

export const satistical7ShipperHighService = async(month) =>{
    try {
        const shipper = await db.user.findAll({
            where : {RoleId : 3}
        })
        const shipperArray = []
        for (const item of shipper) {
            const satistical = await totalPriceShipperService(item.id, month);
            if(satistical instanceof Error) return satistical;
            shipperArray.push({ shipperId: item.id, satistical: satistical, month, shipper: item });
          }
        const topShippers = shipperArray
            .sort((a, b) => b.satistical - a.satistical) 
            .slice(0, 10);
        const category = [];
        const data = [];
        const shipperA = [];
        topShippers.map((item)=>{
            category.push(item.shipper.firstName + item.shipper.lastName);
            data.push(item.satistical);
            shipperA.push(item.shipper)
        })
        return {
            category,
            data,
            shipperA
        }
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
export const revenueShipperByMonthService = async(shipper_id, month) =>{
    try {
        const date = new Date()
        const currentDate = new Date(date.getFullYear(), month, 0);
        const numDate = currentDate.getDate();
        const data = [];
        const dateTitle = []
        if(month > 0 && month  < 13){
            for(let i = 1; i <= numDate; i++){
                const totalByDate = await revenueDateByShipperService(i, month, date.getFullYear(), shipper_id);
                data.push(totalByDate);
                dateTitle.push(i)
            }
            return {
                data,
                dateTitle
            }
        }
        return createError(400, 'Tháng không chính xác!')
    } catch (error) {
        return error;
    }
}

export const getNumOrderByDateByShipperService = async (date, month, year, shipper_id) =>{
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

export const getNumOrderBy7DateService = async (shipper_id) =>{
    try {
        const today = new Date();
        const daysOfWeek = [];
        for(let i = 0; i < 7; i++){
            const day = new Date(today);
            day.setDate(today.getDate() - i);
            daysOfWeek.push(day);
        }
        const dateTitle = [];
        const data = [];
        for(const date of daysOfWeek){
            const dateItem = await getNumOrderByDateByShipperService(date.getDate(), date.getMonth() + 1, date.getFullYear(), shipper_id)
            data.push(dateItem);
            dateTitle.push(`${date.getDate()}-${date.getMonth()}`);
        }
        return {
            data,
            dateTitle
        }
    } catch (error) {
        return error;
    }
}

export const getNumOrderFailedByShipperService = async (shipper_id, month) =>{
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
                        MONTH(createdAt) = ${month}
                    `),
                    { id: orderIds},
                    { StateId: 5}
                ]
            }
        });
        return orders.length;
    } catch (error) {
        return error;
    }
}

export const getNumOrderFailedByShippersService = async(month) =>{
    try {
        const Shippers = [];
        const category = []
        const shipper = await db.user.findAll({
            where : {
                RoleId : 3
            },
        })
        console.log(shipper)
        for (const item of shipper) {
            const numberOrder = await getNumOrderFailedByShipperService(item.id, month);
            if(numberOrder instanceof Error) return numberOrder;
            Shippers.push(numberOrder);
            category.push(item.lastName + item.firstName)
        }
        return {
            shipper : Shippers,
            category
        }
    } catch (error) {
        return error;   
    }
}