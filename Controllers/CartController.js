import { 
    deleteCartService,
    createCartService,
    getCartByIdService,
    getCartsService
} from "../Models/Services/CartService.js";
import createError from "../ultis/createError.js";

export const createCart = async(req, res, next) =>{
    try {
        const idBook = req.params.idBook;
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'));
        const idUser = req.id;
        const cart = await createCartService(req.body.quantity, idBook, idUser);
        if(cart instanceof Error) return next(cart);
        return res.status(200).send(cart);
    } catch (error) {
        next(error)
    }
}
export const deleteCart = async(req, res, next) =>{
    try {
        if(req.idRole == 3 || req.idRole == 4) return next(createError(400, 'Bạn không có quyền này!'))
        const idCart = req.params.idCart;
        const delete_cart = await deleteCartService(idCart, req.id);
        if(delete_cart instanceof Error) return next(delete_cart)
        res.status(200).send({
            status: delete_cart,
            message: 'Xoá thành công!'
        })
    } catch (error) {
        next(error)
    }
}

export const getCartById = async(req, res, next) =>{
    try {
        const idCart = req.params.idCart;
        const Cart = await getCartByIdService(idCart);
        if(Cart instanceof Error) return next(Cart)
        return res.status(200).send(Cart)
    } catch (error) {
        next(error)
    }
}
export const getCarts = async(req, res, next) =>{
    try {
        const customer_id = req.id;
        console.log(customer_id)
        if(!customer_id) return next(createError(400, 'Bạn cần phải đăng nhập!'))
        const carts = await getCartsService(customer_id);
        if(carts instanceof Error) return next(carts);
        res.status(200).send(carts);
    } catch (error) {
        next(error);
    }
}
