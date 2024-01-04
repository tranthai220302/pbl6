import db from "../Entitys/index.js"
import { Op } from "sequelize"
import createError from "../../ultis/createError.js"
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const loginService = async (username, password) => {
    try {
        const checkUsername = await db.user.findOne({
            where: { username },
        });     
        if (!checkUsername) return createError(400, "Tài khoản không chính xác!");
        
        if (checkUsername.password) {
            const checkPass = await argon2.verify(checkUsername.password, password);
            if (!checkPass) return createError(400, "Mật khẩu không chính xác!");
        } else {
            return createError(400, "Mật khẩu không tồn tại!");
        }
        const user = await db.user.findOne({
            where: { username },
            attributes: { exclude: ['password'] }
        }); 
        const token = jwt.sign({
            id: user.id,
            idRole: user.RoleId
        }, process.env.JWT_KEY);
        
        return {
            token,
            user
        };
        
    } catch (error) {
        return error;
    }
    
} 
export const registerService = async (username, email, password, confirmPassword, firstName, lastName, phone, address, age, avatar) =>{
    try {
        const user = await db.user.findOne({
            where : {
                [Op.or] : [
                    {username},
                    {email}
                ]
            }
        })
        if(user) return createError(400, "Tài khoản hoặc Email đã tồn tại!")
        if(password !== confirmPassword) return createError(400, 'Mật khẩu nhập lại không chính xác !')
        if(password.length < 6) return createError(400, 'Mật khẩu phải lớn hơn 6 chữ !')
        const hassPass = await argon2.hash(password)
        const isCustomer = await db.role.findOne({
            where: {
                name: 'Customer'
            }
        })
        const UserLogin = await db.user.create({
            username,
            email,
            firstName,
            lastName,
            phone,
            address,
            age,
            avatar,
            password : hassPass,
            RoleId : isCustomer.id,
        })
        return UserLogin;
    } catch (error) {
        return error;
    }
}

