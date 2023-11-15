import express from 'express'
import { 
    createReport, getReportByStore, storeReportByCustomer
} from '../Controllers/ReportStoreController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerReportStore = express.Router()
routerReportStore.post('/create/:id',verifyjson, createReport)
routerReportStore.get('/list/:id',verifyjson, getReportByStore)
routerReportStore.get('/store',verifyjson, storeReportByCustomer)
export default routerReportStore;   