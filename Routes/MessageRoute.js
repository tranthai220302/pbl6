import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import { 
    createMessage, 
    deleteMessage, 
    getMessage, 
    getMessageByIdChat 
} from '../Controllers/MessageController.js';


const routerMessage = express.Router()
routerMessage.post('/create/:idChat', verifyjson, createMessage)
routerMessage.delete('/delete/:idMessage',verifyjson, deleteMessage)
routerMessage.get('/:idChat',verifyjson, getMessageByIdChat)
export default routerMessage;