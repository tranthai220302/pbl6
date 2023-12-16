import express from 'express'
import { 
    confirmBookFlashSale,
    createBook, 
    deleteBook, 
    getAuthorSearch, 
    getBookBoughtHigh, 
    getBookById, 
    getBookByOrderHigh, 
    getBookByQuery, 
    getBookByStore, 
    getBookFlashSale, 
    getBookIsOrderByStore, 
    getBooks, 
    getLanguages, 
    getNhaXB, 
    getStoreFlashSale, 
    registerBookFlashSale, 
    updateBook 
} from '../Controllers/BookController.js';
import { verifyjson } from '../middleware/jwt.js';
import { confirmBookFlashSaleService } from '../Models/Services/BookService.js';

const routerBook = express.Router()
routerBook.post('/create/:id', verifyjson, createBook)
routerBook.put('/update/:id',verifyjson, updateBook)
routerBook.delete('/delete/:id', verifyjson, deleteBook)
routerBook.get('/', getBooks)
routerBook.get('/search', getBookByQuery)
routerBook.get('/item/:id', getBookById)
routerBook.get('/store/:id', verifyjson, getBookByStore)
routerBook.get('/bookHigh', verifyjson, getBookByOrderHigh)
routerBook.get('/bookIsOrder/:id/:isHigh', verifyjson, getBookIsOrderByStore)
routerBook.get('/orderHigh', getBookBoughtHigh  )
routerBook.get('/flashSale', getBookFlashSale)
routerBook.post('/registerFlashSale/:id', verifyjson, registerBookFlashSale)
routerBook.post('/confirmFlashSale/:id', verifyjson, confirmBookFlashSale)
routerBook.get('/store', getStoreFlashSale)
routerBook.get('/list/nhaXB', getNhaXB)
routerBook.get('/list/languages', getLanguages)
routerBook.get('/list/author', getAuthorSearch)
export default routerBook;