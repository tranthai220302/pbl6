import db from "../Entitys/index.js";
import { Sequelize } from "sequelize";
import createError from "../../ultis/createError.js";
import Op from "sequelize";
export const createCartService = async(quantity, BookId, customerId) =>{
    try {
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

export const deleteCartService = async(id) =>{
    try {
        const delete_cart = await db.cart.destroy({
            where : {id}
        })
        if(delete_cart == 0) return createError(400, 'Xoá giỏ hàng không thành công!')
        return true;
    } catch (error) {
        return error;
    }
}

export const getCartByIdService = async(id) =>{
    try {
        const cart = await db.cart.findOne({
            where: {id}
        })
        if(!cart) return createError(400, 'Tìm kiếm không thành công!')
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
            }
        })
        if(carts.length == 0) return createError(400, 'Không có sản phẩm !')
        return carts;
    } catch (error) {
        return error;   
    }
}