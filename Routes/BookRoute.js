import express from 'express'
import { 
    loginController, 
    registerController 
} from "../Controllers/AuthController.js";

const routerBook = express.Router()
routerBook.post('/create', registerController)
routerBook.post('/update/:id', loginController)
export default routerBook;