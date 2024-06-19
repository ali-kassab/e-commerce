import { userModel } from "../../../Database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utilites/AppError.js"
import bcrypt from 'bcrypt';
import jwt, { decode } from 'jsonwebtoken';


// this function used to sign up the user  option(make token)
export const signup = catchError(async (req, res, next) => {
    const newUser = await userModel.create(req.body)
    return res.json({ msg: 'success', newUser: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });
}
)

// this function used to login the user 
//check if the user is exist in data base
//compare password  
export const login = catchError(async (req, res, next) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("Email or password incorrect", 401))
    }
    if (user.isBlocked == true) return next(new AppError("account is Blocked please connect to admin", 404));

    const match = bcrypt.compareSync(req.body.password, user.password);

    if (!match) {
        await userModel.updateOne({ _id: user._id }, { isActive: false });
        return next(new AppError("Email or password incorrect", 401))
    } else {
        await userModel.updateOne({ _id: user._id }, { isActive: true });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_KEY_LOGIN);
        res.json({ msg: "success", token });
    }
})

//this function used to change the password and refresh the token 
export const changePassword = catchError(async (req, res, next) => {

    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new AppError('Email or password incorrect', 401))
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
        return next(new AppError("password incorrect", 401))
    } else {
        await userModel.findByIdAndUpdate(req.user._id, { password: req.body.newPassword, passwordChangedAt: Date.now() });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_KEY_LOGIN);
        res.json({ msg: "success", token });
    }
})

// this function used in middleware to chech token is exist ,the time of password Changed At
export const protectedRoutes = catchError(async (req, res, next) => {

    const { token } = req.headers
    if (!token) return next(new AppError('token not provided', 401))

    let decoded = jwt.verify(token, process.env.JWT_KEY_LOGIN)
    let user = await userModel.findById(decoded.id)
    if (!user) return next(new AppError('user not found', 401))
    if (user.passwordChangedAt) {
        let time = parseInt(user?.passwordChangedAt.getTime() / 1000)
        if (time > decoded.iat) return next(new AppError('invalid token', 401))
    }
    req.user = user
    next()
})

//this function is userd to authorization in GraphQl
export const authorizationGraphQL = async (token, roles) => {

    if (!token) throw AppError('token not provided', 401)

    let decoded = jwt.verify(token, process.env.JWT_KEY_LOGIN)
    let user = await userModel.findById(decoded.id)
    if (!user) throw AppError('user not found', 401)
    if (user.passwordChangedAt) {
        let time = parseInt(user?.passwordChangedAt.getTime() / 1000)
        if (time > decoded.iat) throw AppError('invalid token', 401)
    }
    if (!roles.includes(user.role)) {
        throw AppError(' you are unauthorized', 401)
    }
    return user
}


// this function used in middleware to filter the role 
export const allowedTo = (...roles) => {
    return catchError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError(' you are unauthorized', 401))
        }
        next()
    }
    )
} 