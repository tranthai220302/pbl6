import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
import { Op, where } from 'sequelize';
export const createBookService = async (store_id, name, desc, price, sales_number, publication_date, author_id, categorys, images) =>{
    try {
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
            await db.image.create({
              filename: image,
              BookId: book.id,
            });
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
        return true;
    } catch (error) {
        return error;
    }
}
export const updateBookService = async(id, name, desc, price, sales_number, publication_date, author_id, categorys) =>{
    try {
        if(!id) return createError(400, 'Không tìm thấy sách!')
        await db.book.update({
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
        const boo1 = await db.book.findByPk(id);
        return boo1;
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
                as: 'Instruments',
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
