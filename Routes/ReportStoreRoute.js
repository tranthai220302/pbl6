import express from 'express'
import { 
    createReport, deleteReport, getBookByReport, getReportByStore, storeReportByCustomer
} from '../Controllers/ReportStoreController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerReportStore = express.Router()
routerReportStore.post('/create/:id',verifyjson, createReport)
routerReportStore.get('/list/:id',verifyjson, getReportByStore)
routerReportStore.get('/store',verifyjson, storeReportByCustomer)
routerReportStore.get('/bookReport/store/:id',verifyjson, getBookByReport)
routerReportStore.delete('/delete/:id',verifyjson, deleteReport)
export default routerReportStore;   