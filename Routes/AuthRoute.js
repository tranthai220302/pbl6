import express from 'express'
import { 
    loginController, 
    registerController,
    logoutController
} from "../Controllers/AuthController.js";

const routerAuth = express.Router()
routerAuth.post('/register', registerController)
routerAuth.post('/login', loginController)
routerAuth.post('/logout', logoutController)
export default routerAuth;