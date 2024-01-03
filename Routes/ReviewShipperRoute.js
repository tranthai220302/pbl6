import express from 'express'
import { StarReviewShipper, createReviewShipper, deleteReviewShipper, getlistReviewShipper, updateReviewShipper } from '../Controllers/ReviewShipperController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerReviewShipper = express.Router()
routerReviewShipper.post('/create/:id',verifyjson, createReviewShipper)
routerReviewShipper.put('/update/:id', verifyjson, updateReviewShipper)
routerReviewShipper.delete('/delete/:id', verifyjson, deleteReviewShipper)
routerReviewShipper.get('/star/:id', StarReviewShipper)
routerReviewShipper.get('listReviewShipper/id', verifyjson, getlistReviewShipper)
export default routerReviewShipper;   