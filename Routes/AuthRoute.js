import express from 'express'
import { 
    loginController, 
    registerController 
} from "../Controllers/AuthController.js";

const routerAuth = express.Router()
routerAuth.post('/register', registerController)
routerAuth.post('/login', loginController)
export default routerAuth;