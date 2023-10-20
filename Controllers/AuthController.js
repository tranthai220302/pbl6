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
            secure: true,
            sameSite: 'None',
            domain: '.harumi.store',
        }).status(200).send('Đăng nhập thành công!')
    } catch (error) {
        next(error)
    }
}
export const registerController = async (req, res, next) =>{
    try {
        const data = req.body;
        const user = await registerService(data.username, data.email, data.password, data.confirmPassword);
        if (user instanceof Error) return next(user)
        return res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}
export const logoutController = async(req, res, next) =>{
    try {
        return res.clearCookie( 'accessToken', {
            sameSite: "none",
            secure: true,
        }).status(200).send("Đăng xuất thành công!")
    } catch (error) {
        next(error)
    }
}

