import express from 'express'
import { 
    deleteUser, 
    getPrecentCustomerByAge, 
    getPrecentCustomerNew, 
    getUserById, 
    getUsersByQuery, 
    updateUser 
} from '../Controllers/UserController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerUser = express.Router()
routerUser.put('/edit/:id',verifyjson, updateUser)
routerUser.delete('/delete/:id', verifyjson, deleteUser)
routerUser.get('/search/:idRole',verifyjson, getUsersByQuery)
routerUser.get('/infor/:id', getUserById)
routerUser.get('/userByDate', verifyjson, getPrecentCustomerNew)
routerUser.get('/userByAge', verifyjson, getPrecentCustomerByAge)
export default routerUser;