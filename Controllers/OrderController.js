import { 
    createOrderService, 
    deleteOrderService, 
    revenueStoreByMonthService, 
    drawPrecentSatiscalService, 
    getOrderByStoreService, 
    getOrdersByCustomerService, 
    satistical7StoreHighService,
    revenuaMonthByAdminService,
    getNumOrderByDateByStoreService,
    getNumOrderBy7DateService,
    revenueByAdminService,

    revenuaAdminByDateSerVice,
    createOrderPaymentOnlieService,
    createOrderByManyBookService
} 
from "../Models/Services/OrderServices.js";
import { getBookByIdService } from "../Models/Services/BookService.js";
import { ConfirmStoreService, getUserByIdService } from "../Models/Services/UserService.js";
import createError from "../ultis/createError.js";
import dotenv  from 'dotenv'
import querystring from 'qs'
import crypto from 'crypto'
import moment from "moment/moment.js";
import { distance } from "../ultis/distance.js";
import { getUserById } from "./UserController.js";
import { priceVoucherStoreByCustomer } from "../Models/Services/VoucherItemService.js";
import { error, warn } from "console";
dotenv.config()
export const createOrder = async (req, res, next) =>{
    try {
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'))
        const quantity = req.body.quantity;
        const order = await createOrderService(req.params.idBook, req.id, quantity, req.body.addressCus, req.body.priceShip, req.body.priceFreeShip, req.body.priceFreeVoucher, req.body.total, req.body.idVoucher);
        if(order instanceof Error) return next(order)
        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
}
export const createOrderByManyBook = async(req, res, next) =>{
    try {
        console.log('ccc')
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'));
        const order = await createOrderByManyBookService(req.body.idBook, req.id, req.body.quantity, req.body.addressCus, req.body.priceShip, req.body.priceFreeShip, req.body.priceFreeVoucher, req.body.total, req.body.idVoucher);
        if(order instanceof Error) next(order);
        res.status(200).send(order)
    } catch (error) {
        next(error);
    }
}
export const getOrdersByCustomer = async (req, res, next) =>{
    try {
        const orders = await getOrdersByCustomerService(req.id, req.query.state);
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
        const BookId = req.params.id;
        const book = await getBookByIdService(BookId)
        if(!book) return next(createError(400, 'Không tìm thấy sách!'))
        const store_id = book.store_id;
        const store = await getUserByIdService(store_id);
        const dis =  await distance(address, store.address);
        const priceShip = parseInt((dis/1000)*2000);
        const priceVS = await priceVoucherStoreByCustomer(customer_id, 1, store_id, currentTotal);
        const priceFS = await priceVoucherStoreByCustomer(customer_id, 2, store_id, currentTotal);
        if(priceShip <= priceFS.price_free) priceFS.price_free = priceShip;

        const total = parseInt(currentTotal) + priceShip - parseInt((priceVS.price_free + priceFS.price_free))
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
export const priceShip = async(req, res, next)=>{
    try {
        console.log('cccc')
        const address = req.body.addressCus;
        const id = req.body.bookId;
        console.log(id)
        let priceShip = 0;
        for(let i = 0; i < id.length; i++){
            try {
                let book = await getBookByIdService(id[i]);
                if(book instanceof Error) next(book)
                let store = await getUserByIdService(book.store_id)
                if(store instanceof Error) next(store);
                let dis =  await distance(address, store.address);
                if(dis instanceof Error) next(dis)
                priceShip  += parseInt((dis/1000)*2000);  
            } catch (error) {
                next(error)
            } 
        }
        console.log(priceShip)
        return res.status(200).send({priceShip})
    } catch (error) {
        next(error)
    }
}
let data = {}
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
        let amount = req.body.total;
        let returnUrl = `https://www.harumi.store/api/order/vnpay_return`;
        let orderId = moment(date).format('DDHHmmss');
        console.log(amount)
        let bankCode =  "";  
        
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
        data = {
            total: amount,
            quantity: req.body.quantity,
            addressCustomer: req.body.addressCus,
            BookId: req.params.id,
            customer_id: req.id,
            priceShip: req.body.priceShip,
            priceFreeShip: req.body.priceFreeShip,
            priceFreeVoucher: req.body.priceFreeVoucher,
            idVoucher: req.body.idVoucher
        };
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
        let vnp_Params = req.query;
        console.log(vnp_Params)
        let secureHash = vnp_Params['vnp_SecureHash'];
    
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
    
        vnp_Params = sortObject(vnp_Params);
        let tmnCode =process.env.vnp_TmnCode
        let secretKey =process.env.vnp_HashSecret
        let signData = querystring.stringify(vnp_Params, { encode: false });   
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");   
        const order = await createOrderPaymentOnlieService(
            data?.total,
            data?.quantity,
            data?.addressCustomer,
            data?.BookId,
            data?.customer_id,
            data?.priceShip,
            data?.priceFreeShip,
            data?.priceFreeVoucher,
            data?.idVoucher
        )
        if(order instanceof Error) return next(order);
        res.render('success', {code: vnp_Params['vnp_ResponseCode']})
    } catch (error) {
        next(error);
    }
}
export const revenuaMonthByAdmin = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        const data = await revenuaMonthByAdminService(req.body.month);
        if(data instanceof Error) next(data);
        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}
