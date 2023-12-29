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
    getBookIsOrderByStoreService,
    getBookBoughtHighService,
    registerBookFlashSaleSeervice,
    confirmBookFlashSaleService,
    getBookFlashSaleService,
    getStoreFlashSaleService,
    getBookWaitConfirmFlashSaleService,
    getNhaXBService,
    getLanguagesService,
    getAuthorSearchServices,
    getBokByArrId,
} 
from "../Models/Services/BookService.js"
import createError from "../ultis/createError.js"

export const createBook = async (req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !==4) return next(createError(400, 'Bạn không có quyền này!'))
        const data = req.body;
        const book = await createBookService(req.params.id, data.name, data.desc, data.price, data.sales_number, data.publication_date, data.author_id, data.categorys, data.images, data.nhaXB, data.languages, data.weight, data.size, data.numPage, data.percentDiscount)
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
export const getBooksByArr = async(req, res, next) => {
    try {
        console.log(req.body.id)
        const books = await getBokByArrId(req.body.id);
        if(books instanceof Error) return next(books)
        return res.status(200).send(books)
    } catch (error) {
        next(error)
    }
}
export const getBooks = async(req, res, next) => {
    try {
        const books = await getBooksService(req.body.id);
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
            ...(q.priceMin && q.priceMax && {price : {
                [Op.and] : [
                    {[Op.gte] : q.priceMin},
                    {[Op.lte] : q.priceMax}
                ]
            }}),
            ...(q.nhaXB && {nhaXB : {   
                [Op.like] : `%${q.nhaXB}%`
            }}),
            ...(q.languages && {languages : {
                [Op.like] : `%${q.languages}%`
            }}),
            ...(q.idStore && {
                store_id : q.idStore
            })
        }
        console.log(filter)
        console.log(q.priceMin)
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
        const booksByQuery = await getBookByQueryService(filter, category, author, req.query.page, 16);
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
        const books = await getBookByStoreService(req.params.id,name,req.query.page, 16)
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
export const getBookIsOrderByStore = async (req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createBook(400, 'Bạn không có quyền này!'))
        const isHigh = req.params.isHigh
        const book = await getBookIsOrderByStoreService(req.params.id, isHigh);
        if(book instanceof Error) return next(book);
        return res.status(200).send(book)
    } catch (error) {
        next(error)
    }
}
export const getBookBoughtHigh = async(req, res, next) =>{
    try {
        const book = await getBookBoughtHighService();
        if(book instanceof Error) return next(book);
        return res.status(200).send(book)
    } catch (error) {
        next(error)
    }
}
export const getBookFlashSale = async(req, res, next) =>{
    try {
        const time = req.query.time;
        const date = new Date();
        const book = await getBookFlashSaleService(time, date);
        if(book instanceof Error) return next(book);
        return res.status(200).send(book)
    } catch (error) {
        next(error)
    }
}
export const registerBookFlashSale = async(req, res, next) =>{
    try {
        if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const id = req.body.id;
        const store_id = req.params.id;
        const date = new Date();
        const registerBook = await registerBookFlashSaleSeervice(store_id, req.body.time, id, date);
        if(registerBook instanceof Error) return next(registerBook);
        return res.status(200).send(registerBook)
    } catch (error) {
        next(error);
    }
}
export const confirmBookFlashSale = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        const id = req.body.id;
        const store_id = req.params.id;
        const confirmBook = await confirmBookFlashSaleService(store_id, id);
        if(confirmBook instanceof Error) return next(confirmBook);
        return res.status(200).send(confirmBook);
    } catch (error) {
        next(error);
    }
}
export const getStoreFlashSale = async(req, res, next) =>{
    try {
        const date = new Date()
        const store = await getStoreFlashSaleService(req.query.time, date);
        if(store instanceof Error) return next(store);
        res.status(200).send(store);
    } catch (error) {
        next(error);
    }
}
export const getBookWaitConfirmFlashSale = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'))
        const book = await getBookWaitConfirmFlashSaleService(req.params.id);
        if(book instanceof Error) return next(book);
        res.status(200).send(book)
    } catch (error) {
        next(error);
    }
}
export const getNhaXB = async(req, res, next) => {
    try {
        const listNXH = await getNhaXBService();
        res.status(200).send(listNXH)
    } catch (error) {
        next(error)
    }
}
export const getLanguages = async(req, res, next) =>{
    try {
        const listLanguage = await getLanguagesService();
        res.status(200).send(listLanguage)
    } catch (error) {
        next(error)
    }
}
export const getAuthorSearch = async(req, res, next) => {
    try {
        const authors = await getAuthorSearchServices();
        res.status(200).send(authors)
    } catch (error) {
        next(error)
    }
}