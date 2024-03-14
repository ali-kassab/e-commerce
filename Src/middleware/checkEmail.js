import { userModel } from "../../Database/models/user.model.js";
import { AppError } from "../utilites/AppError.js";

//this function for check Email is Exist in database or no
export const checkEmail = async (req, res, next) => {

    const Exist = await userModel.findOne({ email: req.body.email })
    if (Exist) {
        next(new AppError('Email already exist', 409))
    } else {
        next()
    }
}