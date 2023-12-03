import db from "../Entitys/index.js";
import { Sequelize, where } from "sequelize";
import createError from "../../ultis/createError.js";
import {Op} from "sequelize";
export const createCartService = async(quantity, BookId, customerId) =>{
    try {
        const book = await db.book.findByPk(BookId)
        if(!quantity || quantity == 0) return createError(400, 'Vui lòng chọn số lượng!')
        if(!book) return createError(400, 'Không tìm thấy sach!')
        const checkCart = await db.cart.findOne({
            where :{
                BookId : BookId,
                customerId,
            }
        })
        if(checkCart){
            const updateCart = await db.cart.update({
                quantity : Sequelize.literal(`quantity + ${quantity}`)

            }, {
                where : {
                    id : checkCart.id
                }
            })
            if(updateCart[0] == 0) return createError(400, "Thêm vào giỏ hàng không thành công!")
            return {
                message: "Thêm vào giỏ hàng thành công!",
            }
        }
        const newCart = await db.cart.create({
            quantity,
            BookId,
            customerId,
        })
        if(!newCart) return createError(400, 'Thêm vò giỏ hàng không thành công!')
        return {
            message: 'Thêm vào giỏ hàng thành công!',
            cart: newCart
        }
    } catch (error) {
        return error;
    }
}
export const updateCartService = async(id, idCustomer, quantity) =>{
    try {
        console.log(id)
        const cart = await db.cart.findOne({
            where : {
                [Op.and] : [
                    {id : id},
                    {customerId : idCustomer}
                ]
            }
        });
        if(!cart) return createError(400, 'Không tìm thấy giỏ hàng !');
        const updateCart = await db.cart.update({
            quantity : quantity
        },
        {
            where : {
                id
            }
        })
        console.log(updateCart)
        if(updateCart[0] == 0) return createError(400, 'Update không thành công!')
        return {
            message : 'Update thành công!'
        }
    } catch (error) {
        return error;
    }
}
export const deleteCartService = async(id, customerId) =>{
    try {
        const cart = await db.cart.findByPk(id);
        if(!cart) return createError(400, 'Không tìm thấy giỏ hàng!')
        if(cart.customerId !== customerId) return createError(400, 'Bạn không thể xó giỏ hầng người khác')
        const delete_cart = await db.cart.destroy({
            where : {
                id
            }
        })
        if(delete_cart == 0) return createError(400, 'Xoá giỏ hàng không thành công!')
        return true;
    } catch (error) {
        return error;
    }
}

export const getCartByIdService = async(id, customerId) =>{
    try {
        const cart = await db.cart.findByPk(id);
        if(!cart) return createError(400, 'Không tìm thấy giỏ hàng!')
        if(cart.customerId !== customerId) return createError(400, 'Bạn không thể xem giỏ hầng người khác')
        return cart;
    } catch (error) {
        return error;
    }
}
export const getCartsService = async(customer_id) =>{
    try {
        const carts = await db.cart.findAll({
            where:{
                customerId : customer_id
            },
            include : [
                {
                    model : db.book
                }
            ]
        })
        if(carts.length == 0) return createError(400, 'Không có sản phẩm !')
        return carts;
    } catch (error) {
        return error;   
    }
}