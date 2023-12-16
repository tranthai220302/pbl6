import express from 'express'
import { 
    createReport, getReportByShipper, shipperReportByCustomer
} from '../Controllers/ReportShipperController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerReportShipper = express.Router()
routerReportShipper.post('/create/:id',verifyjson, createReport)
routerReportShipper.get('/list/:id',verifyjson, getReportByShipper)
routerReportShipper.get('/shipper',verifyjson, shipperReportByCustomer)
export default routerReportShipper;   