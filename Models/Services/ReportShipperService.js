import { Op } from "sequelize";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
export const createReportShipperService = async(filter) =>{
    try {
        const checkReport = await db.reportShipper.findOne({
            where : {
                [Op.and] : [
                    {customer_id : filter.customer_id}, 
                    {shipper_id : filter.shipper_id}
                ]
            }
        })
        if(checkReport) return createError(400, 'Bạn đã báo cáo cửa hàng này rồi!')
        const report = await db.reportShipper.create(filter);
        if(!report) return createError(400, 'Báo cáo không thành công!');
        return {
            report,
            message : 'Cảm ơn báo cáo của bạn, để giúp trang web ngày phát triển hơn!'
        }
    } catch (error) {
        return error;
    }
}
export const getReportByShipperService = async(shipper_id) =>{
    try {
        const reports = await db.reportShipper.findAll({
            where : {shipper_id},
            include : [
                {
                    model : db.user,
                    as : 'customerReportShipper'
                }
            ]
        })
        if(reports.length == 0) return createError(400, 'Không có báo cáo!');
        return reports;
    } catch (error) {
        return error;   
    }
}
export const shipperReportByCustomerService = async() =>{
    try {
        const shipper = await db.reportStore.findAll({
            attributes: ['shipper_id'],
            include: [
              {
                model: db.user,
                as: 'shipperByReport',
                attributes: { exclude: ['password'] }
              },
            ],
          })
          const uniqueShipperIds = new Set();
          const uniqueArray = shipper.filter(item => {
            const isUnique = !uniqueShipperIds.has(item.shipper_id);
            if (isUnique) {
              uniqueShipperIds.add(item.shipper_id);
            }
            return isUnique;
          });
          return uniqueArray;
    } catch (error) {
        return error;
    }
}