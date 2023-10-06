import e from "express";
import db from "../Entitys/index.js"
import createError from "../../ultis/createError.js";

export const createAuthorService = async(name, address, date_birth, date_death) =>{
    try {
        const checkName = await db.author.findOne({
            where : {name}
        })
        if(checkName) return createError(400, 'Tác giả đã tồn tại!')
        const author = await db.author.create({
            name,
            address, 
            date_birth, 
            date_death
        })
        if(!author) return createError(400, 'Thêm tác giả không thành công!')
        return author;
    } catch (error) {
        return error;
    }
}

export const deleteAuthorService = async(id)=>{
    try {
        const delete_author = await db.author.destroy({
            where : {id}
        })
        if(delete_author == 0) return createError(400, 'Xoá tác giả không thành công!');
        return {
            message: 'Xoá thành công!'
        };
    } catch (error) {
        return error;
    }
}

export const getAuthorsService = async()=>{
    try {
        const authors = await db.author.findAll();
        if(authors.length == 0) return createError(400, 'Không có tác giả!')
        return authors;
    } catch (error) {
        return error;
    }
}
export const updateAuthorService = async(name, address, date_birth, date_death, id)=>{
    try {
        const update_author = await db.author.update({
            name,
            address, 
            date_birth,
            date_death
        }, {where : {id}})
        if(update_author[0] == 0) return createError(400, 'Chỉnh sửa không thành công!')
        return {
            status: true,
            message: 'Chỉnh sửa thành công !',
            update_author
        }
    } catch (error) {
        return error;   
    }
}