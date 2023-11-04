import { Op } from "sequelize"
import createError from "../../ultis/createError.js"
import db from "../Entitys/index.js"
export const createMessageService =async (text, idUser, idChat) =>{
    try {
        if(!text) return createError(400, 'Vui lòng nhập tin nhắn!')
        const chat = await db.chat.findByPk(idChat)
        if(!chat) return createError(400, 'Không tìm thấy đoạn chat!')
        const message = await db.message.create({
            text,
            UserId : idUser,
            ChatId: idChat
        })
        if(!message) return createError(400, 'Gửi tin nhắn không thành công!')
        return message;
    } catch (error) {
        return(error)
    }
}
export const getMessageService = () =>{
    try {
        
    } catch (error) {
        return(error)
    }
}
export const getMessageByIdChatService = async(idChat) =>{
    try {
        const chat = await db.chat.findByPk(idChat)
        if(!chat) return createError(404, 'Khong tim thay chat!')
        const messages = await db.message.findAll({
            where : {
                ChatId: idChat
            }
        })
        return messages;
    } catch (error) {
        return(error)
    }
}
export const deleteMessageService = async(id, idUser) =>{
    try {
        const deleteMessage = await db.message.destroy({
            where : {
                [Op.and] : [
                    {id},
                    {UserId: idUser}
                ]
            }
        })
        if(deleteMessage == 0) return createError(400, 'Xoá không thành công!')
        return {
            status: true,
            message: 'Xoá tin nhắn thành công!'
        }
    } catch (error) {
        return error;
    }
}