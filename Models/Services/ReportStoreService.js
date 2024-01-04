import { Op } from "sequelize";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
export const createReportService = async(filter) =>{
    try {
        const checkBook = await db.book.findByPk(filter.book_id)
        if(!checkBook) return createError(400, 'Không tìm thấy sách!')
        const checkReport = await db.reportStore.findOne({
            where : {
                [Op.and] : [
                    {customer_id : filter.customer_id}, 
                    {book_id : filter.book_id}
                ]
            }
        })
        filter.store_id = checkBook.store_id;
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
                },
                {
                    model : db.book,
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
export const getBookByReportService = async(id)=>{
    try {
        const book = await db.book.findAll({
            include : [
                {
                    model : db.reportStore,
                    where : {
                        store_id : id
                    },
                    include : [
                        {
                            model : db.user,
                            as : 'customerReport'
                        }
                    ]

                },
                {
                    model : db.category,
                },
                {
                    model : db.author,
                },
                {
                    model : db.image
                },
                {
                    model : db.user,
                    include : [
                        {
                            model : db.storeRequest,
                            as : "DetailStore"
                        }
                    ]
                }
            ]
        })
        if(book.length === 0) return createError(400, 'Không có sách bị báo cáo!')
        return book;
    } catch (error) {
        return error;
    }
}
export const deletReportService = async(id)=>{
    try {
        const delete1 = await db.reportStore.destroy({
            where : {id}
        })
        if(delete1 == 0) return createError(400, 'Xoá không thành công!');
        return {
            message : 'Xoá thành công!'
        }
    } catch (error) {
        return error;
    }
}