import { 
    createOrderService, 
    deleteOrderService, 
    revenueStoreByMonthService, 
    drawPrecentSatiscalService, 
    getOrderByStoreService, 
    getOrdersByCustomerService, 
    satistical7StoreHighService,
    getNumOrderByDateByStoreService,
    getNumOrderBy7DateService,
    revenueByAdminService,
    revenuaAdminByDateSerVice
} 

from "../Models/Services/OrderServices.js";
import { ConfirmStoreService, getUserByIdService } from "../Models/Services/UserService.js";
import createError from "../ultis/createError.js";
import dotenv  from 'dotenv'
import querystring from 'qs'
import crypto from 'crypto'
import moment from "moment/moment.js";
import { distance } from "../ultis/distance.js";
import { getUserById } from "./UserController.js";
import { priceVoucherStoreByCustomer } from "../Models/Services/VoucherItemService.js";
dotenv.config()
export const createOrder = async (req, res, next) =>{
    try {
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'))
        const quantity = req.body.quantity;
        const isPayment = req.body.isPayment
        const order = await createOrderService(req.params.idBook, req.id, quantity, isPayment, req.body.addressCus);
        if(order instanceof Error) return next(order)
        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
}

export const getOrdersByCustomer = async (req, res, next) =>{
    try {
        const orders = await getOrdersByCustomerService(req.id);
        if(orders instanceof Error) return next(orders);
        res.status(200).send(orders);
    } catch (error) {
        next(error)
    }
}
export const getOdrderByStore = async (req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 4) return createError(400, 'Bạn không có quyền này!')
        const orders = await getOrderByStoreService(req.params.id);
        if(orders instanceof Error) return next(orders);
        res.status(200).send(orders)
    } catch (error) {
       next(error) 
    }
}
export const deleteOrder = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 4) return createError(400, 'Bạn không có quyền này!')
        const delete_order = await deleteOrderService(req.params.id);
        if(delete_order instanceof Error) next(delete_order);
        res.status(200).send(delete_order)
    } catch (error) {
        next(error)
    }
}

export const satistical7StoreHigh = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return createError(400, 'Bạn không có quyền này!');
        const topStores = await satistical7StoreHighService(req.params.month);
        if(topStores instanceof Error) return next(topStores);
        res.status(200).send(topStores)
    } catch (error) {
        next(error)
    }
}
export const drawPrecentSatiscal = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return createError(400, 'Bạn không có quyền này!');
        const topStores = await drawPrecentSatiscalService(req.params.month);
        if(topStores instanceof Error) return next(topStores);
        res.status(200).send(topStores)
    } catch (error) {
        next(error)
    }
}
export const revenueStoreByMonth = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return createError(400, 'Bạn không có quyền này!');
        const doanhhthu = await revenueStoreByMonthService(req.params.id, req.body.month);
        if(doanhhthu instanceof Error) return next(doanhhthu);
        res.status(200).send(doanhhthu)
    } catch (error) {
        next(error)
    }
}
export const getNumOrderBy7Date = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        const doanhhthu = await getNumOrderBy7DateService(req.params.id);
        if(doanhhthu instanceof Error) return next(doanhhthu);
        res.status(200).send(doanhhthu)
    } catch (error) {
        next(error)
    }
}
export const revenueByAdmin = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        let doanhhthu;
        if(req.body.month) doanhhthu = await revenueByAdminService(req.body.month)
        else doanhhthu = await revenuaAdminByDateSerVice(req.body.date)
        if(doanhhthu instanceof Error) return next(doanhhthu);
        return res.status(200).send(doanhhthu)
    } catch (error) {
        next(error)
    }
}
export const priceShipController = async(req, res, next) =>{
    try {
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'));
        const address = req.body.addressCus;
        const currentTotal = req.body.total;
        const customer_id = req.id;
        const store_id = req.params.id;
        const store = await getUserByIdService(store_id);
        const dis =  await distance(address, store.address);
        const priceShip = parseInt((dis/1000)*2000);
        const priceVS = await priceVoucherStoreByCustomer(customer_id, 1, store_id, currentTotal);
        const priceFS = await priceVoucherStoreByCustomer(customer_id, 2, store_id, currentTotal);
        const total = parseInt(currentTotal) + priceShip - parseInt((priceVS.price_free + priceFS.price_free))
        console.log(currentTotal + priceShip)
        return res.status(200).send({
            priceShip,
            priceFS,
            priceVS,
            total 
        })
    } catch (error) {
        next(error)   
    }
}
export const createPaymentUrl = async(req, res, next) =>{
    try {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
    
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        
        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        let tmnCode =process.env.vnp_TmnCode
        let secretKey =process.env.vnp_HashSecret
        let vnpUrl =process.env.vnp_Url
        let returnUrl = "http://localhost:8080/order"
        let orderId = moment(date).format('DDHHmmss');
        let amount = req.body.amount;
        console.log(amount)
        let bankCode =  "VNPAYQR";  
        
        let locale = 'vn';
        if(locale === null || locale === ''){
            locale = 'vn';
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }
    
        vnp_Params = sortObject(vnp_Params);
    
        let signData = querystring.stringify(vnp_Params, { encode: false });   
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        res.status(200).send(vnpUrl)
    } catch (error) {
        next(error)
    }
}
function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
export const vpnayReturn = async(req, res, next) =>{
    try {
        console.log('cc')
        let vnp_Params = req.query;
    
        let secureHash = vnp_Params['vnp_SecureHash'];
    
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
    
        vnp_Params = sortObject(vnp_Params);
        let tmnCode =process.env.vnp_TmnCode
        let secretKey =process.env.vnp_HashSecret
    
        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");     
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
    
        if(secureHash === signed){
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    
            res.render('success', {code: vnp_Params['vnp_ResponseCode']})
        } else{
            res.render('success', {code: '97'})
        }
    } catch (error) {
        return error;
    }
}

