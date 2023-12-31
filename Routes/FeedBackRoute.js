import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import { createFeedBack, deleteFeedBack, updateFeedBack } from '../Controllers/FeedBackController.js';
const routerFeedBack = express.Router()
routerFeedBack.post('/create/:id',verifyjson, createFeedBack);
routerFeedBack.delete('/delete/:id', verifyjson, deleteFeedBack);
routerFeedBack.put('/update/:id',verifyjson, updateFeedBack)
export default routerFeedBack;