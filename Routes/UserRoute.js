import express from 'express'
import { 
    ConfirmStore,
    confirmOrderByStore,
    deleteUser, 
    getNumberAdmin, 
    getPrecentCustomerByAge, 
    getPrecentCustomerNew, 
    getRequestStores, 
    getUserById, 
    getUsersByQuery, 
    sendRequireStore, 
    updateUser,
    sendRequireShipper,
    ConfirmShipper,
    getRequestShippers,
    cancleRequestStore,
    cancleRequestShipper,
    workByStore
} from '../Controllers/UserController.js';
import { verifyjson } from '../middleware/jwt.js';
import { revenuaMonthByAdmin } from '../Controllers/OrderController.js';

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
routerUser.post('/confirmOrder/:id', verifyjson, confirmOrderByStore)
routerUser.post('/registerShipper', verifyjson, sendRequireShipper)
routerUser.post('/confirmShipper/:id', verifyjson, ConfirmShipper)
routerUser.get('/listRequestShipper', verifyjson, getRequestShippers)
routerUser.get('/number', verifyjson, getNumberAdmin)
routerUser.post('/revenuaAdminByMonth', verifyjson, revenuaMonthByAdmin)
routerUser.post('/cancleRequestStore/:id', verifyjson, cancleRequestStore)
routerUser.post('/cancleRequestShipper/:id', verifyjson, cancleRequestShipper)
routerUser.get('/workStore', verifyjson, workByStore)

export default routerUser;