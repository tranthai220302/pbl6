import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import { 
    createChat, 
    deleteChat,  
    getChatById,  
    getChatsByIdUser
} from '../Controllers/ChatController.js';
const routerChat = express.Router()
routerChat.post('/create', verifyjson, createChat)
routerChat.delete('/delete/:idChat',verifyjson, deleteChat)
routerChat.get('/',verifyjson, getChatsByIdUser)
routerChat.get('/:idChat', verifyjson, getChatById)
export default routerChat;