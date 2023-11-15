import { Op } from "sequelize";
import { 
    createBookService, 
    deleteBookService,
    getBookByQueryService,
    getBooksService,
    updateBookService ,
    getBookByIdService,
    getBookByStoreService,
    getBookByOrderHighService,
} 
from "../Models/Services/BookService.js"
import createError from "../ultis/createError.js"

export const createBook = async (req, res, next) =>{
    try {
        if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'))
        const data = req.body;
        const book = await createBookService(req.id, data.name, data.desc, data.price, data.sales_number, data.publication_date, data.author_id, data.categorys, data.images)
        if(book instanceof Error) return next(book)
        return res.status(200).send(book)
    } catch (error) {
        next(error)
    }
}
export const deleteBook = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'))
        const delete_book = await deleteBookService(req.params.id)
        if(deleteBook instanceof Error) return next(delete_book)
        return res.status(200).send(delete_book)
    } catch (error) {
        next(error)
    }
}
export const updateBook = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'))
        const data = req.body;
        const update_book = await updateBookService(req.params.id, data.name, data.desc, data.price, data.sales_number, data.publication_date, data.author_id, data.categorys)
        if(deleteBook instanceof Error) return next(update_book)
        return res.status(200).send(update_book)
    } catch (error) {
        next(error)
    }
}
export const getBooks = async(req, res, next) => {
    try {
        const books = await getBooksService();
        if(books instanceof Error) return next(books)
        return res.status(200).send(books)
    } catch (error) {
        next(error)
    }
}
export const getBookByQuery= async(req, res, next) =>{
    try {
        const q = req.query;
        const filter = {
            ...(q.name && {name : {
                [Op.like] : `%${q.name}%`
            }}),
            ...(q.desc && {desc : {
                [Op.like] : `%${q.desc}%`
            }}),
            ...(q.price && {price : {
                [Op.lt] : q.price
            }})
        }
        const category = {
            ...(q.category && {name : {
                [Op.like]: `%${q.category}%`,
            }}),
        }
        const author = {
            ...(q.author && {
                name : {
                    [Op.like] : `%${q.author}%`
                }
            })
        }
        const booksByQuery = await getBookByQueryService(filter, category, author);
        if(booksByQuery instanceof Error) return next(booksByQuery)
        return res.status(200).send(booksByQuery);
    } catch (error) {
        next(error)
    }
}
export const getBookById  = async(req, res, next) =>{
    try {
        const book = await getBookByIdService(req.params.id)
        if(book instanceof Error) return next(book)
        return res.status(200).send(book);
    } catch (error) {
        next(error)
    }
}
export const getBookByStore = async(req, res, next) =>{
    try {
        const name = req.query.name;
        const books = await getBookByStoreService(req.params.id,name)
        if(books instanceof Error) return next(books)
        return res.status(200).send(books)    
    } catch (error) {
        next(error)
    }
}
export const getBookByOrderHigh = async (req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createBook(400, 'Bạn không có quyền này!'))
        const book = await getBookByOrderHighService();
        if(book instanceof Error) return next(book);
        return res.status(200).send(book)
    } catch (error) {
        next(error)
    }
}
