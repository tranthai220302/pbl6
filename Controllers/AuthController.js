import { 
    loginService, 
    registerService 
} from "../Models/Services/AuthService.js"
export const loginController = async(req, res, next) =>{
    try {
        const data = req.body;
        const token = await loginService(data.username, data.password)
        if (token instanceof Error) return next(token)
        return res.cookie('accessToken', token, {
            httpOnly: true,
        }).status(200).send('Đăng nhập thành công!')
    } catch (error) {
        next(error)
    }
}
export const registerController = async (req, res, next) =>{
    try {
        const data = req.body;
        const user = await registerService(data.username, data.email, data.password, data.confirmPassword);
        if (token instanceof Error) return next(token)
        return res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}

