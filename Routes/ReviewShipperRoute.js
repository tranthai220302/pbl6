import express from 'express'
import { createReviewShipper, deleteReviewShipper, updateReviewShipper } from '../Controllers/ReviewShipperController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerReviewShipper = express.Router()
routerReviewShipper.post('/create/:id',verifyjson, createReviewShipper)
routerReviewShipper.put('/update/:id', verifyjson, updateReviewShipper)
routerReviewShipper.delete('/delete/:id', verifyjson, deleteReviewShipper)
export default routerReviewShipper;   