import { 
    createChatService, 
    deleteChatService, 
    getChatByIdService, 
    getChatsByIdService 
} from "../Models/Services/ChatService.js"

export const createChat = async(req, res, next)=>{
    try {
        const filter = {
            customer_id: req.idRole == 1 ? req.id : req.body.to,
            store_id : req.idRole == 2 ? req.id : req.body.to,
            readBySeller: req.idRole == 2 ? true : false,
            readByBuyer: req.idRole == 1? true : false
        }
        const chat = await createChatService(filter);
        if(chat instanceof Error) return next(chat);
        res.status(200).send(chat)
    } catch (error) {
        next(error)
    }
}
export const getChatById = async(req, res, next)=>{
    try {
        const id = req.params.idChat;
        const chat = await getChatByIdService(id);
        if(chat instanceof Error) return next(chat);
        res.status(200).send(chat);        
    } catch (error) {
        next(error);
    }
}
export const getChatsByIdUser = async(req, res, next)=>{
    try {
        const filter = {
            ...(req.idRole == 2 &&{
                store_id : req.id
            }),
            ...(req.idRole == 1 &&{
                customer_id : req.id
            })
        }
        const chats = await getChatsByIdService(filter)
        if(chats instanceof Error) return(chats);
        res.status(200).send(chats);
    } catch (error) {
        next(error)
    }
}
export const deleteChat = async(req, res, next)=>{
    try {
        const delete_chat = await deleteChatService(req.params.idChat);
        if(delete_chat instanceof Error) return next(delete_chat)
        res.status(200).send(delete_chat)
    } catch (error) {
        next(error);
    }
}