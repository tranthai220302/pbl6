import express from 'express'
import { 
    ConfirmStore,
    deleteUser, 
    getPrecentCustomerByAge, 
    getPrecentCustomerNew, 
    getRequestStores, 
    getUserById, 
    getUsersByQuery, 
    sendRequireStore, 
    updateUser,
    ConfirmShipper,
    getRequestShippers,
    sendRequireShipper 
} from '../Controllers/UserController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerUser = express.Router()
routerUser.put('/edit/:id',verifyjson, updateUser)
routerUser.delete('/delete/:id', verifyjson, deleteUser)
routerUser.get('/search/:idRole',verifyjson, getUsersByQuery)
routerUser.get('/infor/:id', getUserById)
routerUser.get('/userByDate', verifyjson, getPrecentCustomerNew)
routerUser.get('/userByAge', verifyjson, getPrecentCustomerByAge)
routerUser.post('/openStore', verifyjson, sendRequireStore)
routerUser.post('/confirm/:id', verifyjson, ConfirmStore)
routerUser.get('/listRequest', verifyjson, getRequestStores)
routerUser.post('/registerShipper', verifyjson, sendRequireShipper)
routerUser.post('/confirmShipper/:id', verifyjson, ConfirmShipper)
routerUser.get('/listRequestShipper', verifyjson, getRequestShippers)
export default routerUser;