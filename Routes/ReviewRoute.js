import express from 'express'
import { 
    createReview, deleteReview, getReviewsByBook, updateReview,
} from '../Controllers/ReviewController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerReview = express.Router()
routerReview.post('/create/:id',verifyjson, createReview)
routerReview.get('/:id', getReviewsByBook)
routerReview.delete('/delete/:id', verifyjson, deleteReview)
routerReview.put('/update/:id', verifyjson, updateReview);
export default routerReview;