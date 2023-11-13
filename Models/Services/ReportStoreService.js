import { Op } from "sequelize";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
export const createReportService = async(filter) =>{
    try {
        const checkReport = await db.reportStore.findOne({
            where : {
                [Op.and] : [
                    {customer_id : filter.customer_id}, 
                    {store_id : filter.store_id}
                ]
            }
        })
        if(checkReport) return createError(400, 'Bạn đã báo cáo cửa hàng này rồi!')
        const report = await db.reportStore.create(filter);
        if(!report) return createError(400, 'Báo cáo không thành công!');
        return {
            report,
            message : 'Cảm ơn báo cáo của bạn, để giúp trang web ngày phát triển hơn!'
        }
    } catch (error) {
        return error;
    }
}
export const getReportByStoreService = async(store_id) =>{
    try {
        const reports = await db.reportStore.findAll({
            where : {store_id},
            include : [
                {
                    model : db.user,
                    as : 'customerReport'
                }
            ]
        })
        if(reports.length == 0) return createError(400, 'Không có báo cáo!');
        return reports;
    } catch (error) {
        return error;   
    }
}
export const storeReportByCustomerService = async() =>{
    try {
        const store = await db.reportStore.findAll({
            attributes: ['store_id'],
            include: [
              {
                model: db.user,
                as: 'storeByReport',
                attributes: { exclude: ['password'] }
              },
            ],
          })
          const uniqueStoreIds = new Set();
          const uniqueArray = store.filter(item => {
            const isUnique = !uniqueStoreIds.has(item.store_id);
            if (isUnique) {
              uniqueStoreIds.add(item.store_id);
            }
            return isUnique;
          });
          return uniqueArray;
    } catch (error) {
        return error;
    }
}