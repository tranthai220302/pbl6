import createError from "../../ultis/createError.js"
import db from "../Entitys/index.js"
export const createCategoryService = async(name, img)=>{
    try {
        const checkName = await db.category.findOne({
            where : {
                name
            }
        })
        console.log(checkName)
        if(checkName) return createError(400, 'Danh mục này đã tồn tại!')
        const category = await db.category.create({name, img})
        if(!category) return createError(400, 'Thêm danh mục khong thành công!')
        return category;
    } catch (error) {
        next(error)
    }
}
export const getCategorysService = async(isNumber, page)=>{
    try {
        if(!isNumber){
            const categorys = await db.category.findAll();
            if(categorys.length == 0) return createError(400, 'Không tìm thấy danh mục!')
            return categorys;
        }else{
            const offset = (page - 1)*3;
            const categorys = await db.category.findAll({
                offset : offset,
                limit : 3,
            });
            const numPage = await db.category.count();
            let number = [];
            for(let item of categorys){
                const numberItem = await db.book.count({
                    include : [
                        {
                            model : db.category,
                            where : {
                                name : item.name
                            }
                        }
                    ]
                })
                number.push(numberItem)
            }
            if(categorys.length == 0) return createError(400, 'Không tìm thấy danh mục!')
            return {
                categorys,
                number,
                numPage : Math.ceil(numPage/3)
            };
        }
    } catch (error) {
        return(error)
    }
}
export const deleteCategoryService = async(id)=>{
    try {
        console.log(id)
        const category = await db.category.findByPk(id)
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
        return(error)
    }
}
export const updateCategoryService = async(id, name, desc, img)=>{
    try {
        const category = await db.category.findByPk(id)
        if(!category) return createError(400, 'Không tìm thấy danh mục!')
        const update = await db.category.update({
            name,
            desc,
            img
        },{where : {id}})
        if(update[0] === 0) return createError(400, 'Chỉnh sửa không thành công!')
        return{
            status: true,
            message: 'Chỉnh sửa thành công!'
        }
    } catch (error) {
        return(error)
    }
}

