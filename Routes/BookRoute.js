import express from 'express'
import { 
    createBook, 
    deleteBook, 
    getBookById, 
    getBookByQuery, 
    getBooks, 
    updateBook 
} from '../Controllers/BookController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerBook = express.Router()
routerBook.post('/create', verifyjson, createBook)
routerBook.put('/update/:id',verifyjson, updateBook)
routerBook.delete('/delete/:id', verifyjson, deleteBook)
routerBook.get('/', getBooks)
routerBook.get('/search', getBookByQuery)
routerBook.get('/:id', getBookById)
export default routerBook;