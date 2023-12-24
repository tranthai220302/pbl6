import { createMessageService, deleteMessageService, getMessageByIdChatService } from "../Models/Services/MessageService.js";

export const createMessage = async (req, res, next) =>{
    try {
        const idChat = req.params.idChat;
        const message = await createMessageService(req.body.text, req.id, idChat, req.body.img);
        if(message instanceof Error) return next(message);
        res.status(200).send(message)
    } catch (error) {
        next(error)
    }
}
export const getMessage = (req, res, next) =>{
    try {
        
    } catch (error) {
        next(error)
    }
}   
export const getMessageByIdChat = async (req, res, next) =>{
    try {
        const idChat = req.params.idChat;
        const messages = await getMessageByIdChatService(idChat);
        if(messages instanceof Error) return next(messages);
        res.status(200).send(messages);
    } catch (error) {
        next(error)
 ;   }
}
export const deleteMessage = async (req, res, next) =>{
    try {
        const idMessage = req.params.idMessage;
        const delete_message = await deleteMessageService(idMessage, req.id)
        if(delete_message instanceof Error) return next(delete_message);
        res.status(200).send(delete_message);
    } catch (error) {
        
    }
}