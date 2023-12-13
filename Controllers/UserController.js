import { 
    deleteUserService,
    updateUserService,
    getUsersByQueryService,
    getUserByIdService,
    getPrecentCustomerNewService,
    getPrecentCustomerByAgeService,
    ConfirmStoreService,
    sendRequireStoreService,
    getRequestStoresService
} from "../Models/Services/UserService.js";
import { Op } from "sequelize";
import createError from "../ultis/createError.js";
import { isToday, nextDay } from "date-fns";
import { confirmOrderByStoreService } from "../Models/Services/OrderServices.js";

export const updateUser = async(req, res, next) =>{
    try {
        const data = req.body;
        const id = req.params.id;
        if(req.id == parseInt(id) || req.idRole === 4){
            const user = await updateUserService(data, id);
            if(user instanceof Error) return next(user)
            return res.status(200).send(user)
        } else return next(createError(400, 'Bạn không có quyền này !'))
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'))
        const id = req.params.id;
        const deleteUser = await deleteUserService(id);
        if(deleteUser === true) return res.status(200).send('Xoá user thành công!')
        return next(createError(400, "Xoá không thành công!"))
    } catch (error) {
        next(error)
    }
}

export const getUsersByQuery = async(req, res, next) =>{
    try {
        const  idRole = req.params.idRole
        const q = req.query;
        const filter = {
            ...(q.name && {[Op.or] : {
                firstName : {
                    [Op.like] : `%${q.name}%`
                },
                lastName : {
                    [Op.like] : `%${q.name}%`
                }
            }}),
            ...(q.address) && {
                address : {
                    [Op.like] : `%${q.address}%`
                }
            }
        }
        if(req.idRole!==4) return next(createError(400, 'Bạn không có quyền này!'))
        if(idRole == 4) return next(createError(400, 'Người dùng không tồn tại!'))
        const users = await getUsersByQueryService(filter, idRole);
        if(users instanceof Error) return next(users)
        return res.status(200).send(users);
    } catch (error) {
        next(error)
    }
}
export const getUserById = async(req, res, next) =>{
    try {
        const user = await getUserByIdService(req.params.id);
        if(user instanceof Error) return next(user)
        return res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}
export const getPrecentCustomerNew = async (req, res, next)=>{
    try {
        if(req.idRole !== 4) return createError(400, 'Bạn không có quyền này!')
        const userByDate = await getPrecentCustomerNewService();
        if(userByDate instanceof Error) next(userByDate);
        return res.status(200).send(userByDate)
    } catch (error) {
        next(error);
    }
}
export const getPrecentCustomerByAge = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return createError(400, 'Bạn không có quyền này!')
        const userByAge = await getPrecentCustomerByAgeService();
        if(userByAge instanceof Error) next(userByAge);
        return res.status(200).send(userByAge)
    } catch (error) {
        next(error);
    }
}
export const ConfirmStore = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này !'));
        const confirm = await ConfirmStoreService(req.params.id);
        if(confirm instanceof Error) next(confirm);
        res.status(200).send(confirm)
    } catch (error) {
        next(error)
    }
}
export const sendRequireStore = async(req, res, next) =>{
    try {
        if(req.idRole != 1) return next(createError(400, 'Bạn không có quyền này!'))
        const filter = {
            ...(req.body.nameStore && {nameStore : req.body.nameStore}),
            ...(req.body.descStore && {descStore : req.body.descStore}),
            ...(req.id && {customer_id : req.id}),
            isConfirm : false
        }
        const sendRequire = await sendRequireStoreService(filter);
        if(filter instanceof Error) next(filter);
        res.status(200).send(sendRequire)
    } catch (error) {
        next(error)
    }
}
export const getRequestStores = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        const listRequest = await getRequestStoresService();
        if(listRequest instanceof Error) return next(listRequest);
        res.status(200).send(listRequest)
    } catch (error) {
        next(error)
    }
}
export const confirmOrderByStore = async(req, res, next) =>{
    try {
        if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const idOrder = req.params.id;
        const confirm = await confirmOrderByStoreService(idOrder, req.id);
        if(confirm instanceof Error) return next(confirm);
        res.status(200).send(confirm);
    } catch (error) {
        next(error);
    }
}