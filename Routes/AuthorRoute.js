import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import {
     deleteAuthor ,
     createAuthor,
     updateAuthor,
     getAuthors
} 
from '../Controllers/AuthorController.js';

const routerAuhtor = express.Router()
routerAuhtor.post('/create', verifyjson, createAuthor)
routerAuhtor.delete('/delete/:id',verifyjson, deleteAuthor)
routerAuhtor.get('/',verifyjson, getAuthors)
routerAuhtor.put('/update/:id',verifyjson, updateAuthor)
export default routerAuhtor;