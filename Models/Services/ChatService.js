import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
import { Op } from "sequelize";
export const createChatService = async(filter)=>{
    try {
        const checkChat = await db.chat.findOne({
            where : {
                [Op.and] : [
                    {customer_id : filter.customer_id},
                    {store_id : filter.store_id}
                ]
            }
        })
        if(checkChat) return {
            message : 'Đoạn chat đã được tạo trước đó !',
            chat : checkChat
        }
         const chat = await db.chat.create(filter);
        if(!chat) return createError(400, 'Tạo cuộc trò chuyện không thành công!')
        return {
            message : 'Tạo đoạn chat thành công!',
            chat
        }
    } catch (error) {
        return error;
    }
}
export const getChatsByIdService = async(filter)=>{
    try {
        const chats = await db.chat.findAll({
            where : filter,
            include : [{
                model: db.user,
                as: 'Participant1',
                attributes: { exclude: ['password'] },
            }, {
                model: db.user,
                as: 'Participant2',
                attributes: { exclude: ['password'] },
                include : [
                    {
                        model : db.storeRequest,
                        as : 'DetailStore'
                    }
                ]
            }]
        })
        return chats;
    } catch (error) {
        return error;
    }
}
export const deleteChatService = async(id)=>{
    try {
        const delete_chat = await db.chat.destroy({
            where : {id}
        })
        if(delete_chat === 0) return createError(400, 'Xoá cuộc trò chuyện không thành công!')
        return {
            status: true,
            message: 'Xoá cuộc trò chuyện thành công!'
        }
    } catch (error) {
        return error;
    }
}
export const getChatByIdService = async(id)=>{
    try {
        const chat = await db.chat.findByPk(id);
        if(!chat) return createError(400, 'Không tìm thấy cuộc trò chuyện!')
        return chat;
    } catch (error) {
        return error;
    }
}