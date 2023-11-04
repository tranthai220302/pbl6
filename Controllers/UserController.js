import { 
    deleteUserService,
    updateUserService,
    getUsersByQueryService,
    getUserByIdService,
    getPrecentCustomerNewService,
    getPrecentCustomerByAgeService
} from "../Models/Services/UserService.js";
import { Op } from "sequelize";
import createError from "../ultis/createError.js";
import { nextDay } from "date-fns";

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