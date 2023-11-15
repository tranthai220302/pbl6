import createError from "../../ultis/createError.js"
import db from "../Entitys/index.js"
export const createCategoryService = async(name)=>{
    try {
        const checkName = await db.category.findOne({
            where : {
                name
            }
        })
        console.log(checkName)
        if(checkName) return createError(400, 'Danh mục này đã tồn tại!')
        const category = await db.category.create({name})
        if(!category) return createError(400, 'Thêm danh mục khong thành công!')
        return category;
    } catch (error) {
        next(error)
    }
}
export const getCategorysService = async()=>{
    try {
        const categorys = await db.category.findAll();
        if(categorys.length == 0) return createError(400, 'Không tìm thấy danh mục!')
        return categorys;
    } catch (error) {
        next(error)
    }
}
export const deleteCategoryService = async(id)=>{
    try {
        const category = await db.category.findOne({id})
        if(!category) return createError(400, 'Không tìm thấy danh mục!')
        const delete_category = await db.category.destroy({
            where:{id}
        })
        if(delete_category == 0) return createError(400, 'Xoá không thành công!')
        return{
            status: true,
            message: 'Xó dnh mục thành công!'
        }
    } catch (error) {
        next(error)
    }
}
