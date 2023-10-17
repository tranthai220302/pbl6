import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
import { Op, where } from 'sequelize';
export const createBookService = async (store_id, name, desc, price, sales_number, publication_date, author_id, categorys, images) =>{
    try {
        const checkBook = await db.book.findOne({
            where : {
                name,
            }
        })
        if(checkBook) return createError(400, 'Sách này đã tồn tại!')
        const book = await db.book.create({
            name,
            desc,
            price,
            sales_number,
            publication_date,
            store_id,
            author_id
        })
        if(!book) return createError(400, 'Thêm sách không thành công!')
          for (const image of images) {
            const newImage = await db.image.create({
              filename: image,
            });
            await book.addImage(newImage)
          }
        await book.addCategory(categorys);
        await book.save()
        return book;
    } catch (error) {
        return createError(error.status, error.message);        
    }
}
export const deleteBookService = async (id) =>{
    try {
        if(!id) return createError(400, 'Không tìm thấy sách!')
        const deleteBook = await db.book.destroy({
            where : {id}
        })
        if(!deleteBook) return createError(400, 'Xoá sách không thành công!')
        return {
            status: true,
            message: 'Xoá sách thành công!'
        };
    } catch (error) {
        return error;
    }
}
export const updateBookService = async(id, name, desc, price, sales_number, publication_date, author_id, categorys) =>{
    try {
        if(!id) return createError(400, 'Không tìm thấy sách!')
        const update_book = await db.book.update({
            name,
            desc,
            price,
            sales_number,
            publication_date,
            author_id   
        },{ where : {id}})
        const book = await db.book.findByPk(id)
        await book.setCategories(categorys);
        await book.save();
        if(update_book[0] == 0) return createError(400, 'Update không thành công!')
        return {
            status: true,
            message: 'update thành công !'
        }
    } catch (error) {
        return error;
    }
}
export const getBooksService = async() =>{
    try {
        const books = await db.book.findAll();
        if(!books) return createError(400, 'Không có sách!');
        return books;
    } catch (error) {
        return error;
    }
} 
export const getBookByQueryService = async(filter, category, author) =>{
    try {
        const booksByQuery = await db.book.findAll({
            include :[{
                model : db.category,
                where : category
                
            },{
                model: db.author,
                where: author
            }],
            where : {
                [Op.and] : [filter]
            }
        });
        
        if (!booksByQuery || booksByQuery.length === 0) {
            return createError(400, "Không tìm thấy sách!");
        }
        
        return booksByQuery;
    } catch (error) {
        return error;
    }
}
export const getBookByIdService = async(id) =>{
    try {
        const book = await db.book.findOne({
            where : {id}
        })
        if(!book) return createError(400, 'Không có sách!')
        return book;
    } catch (error) {
        return error;
    }
}
