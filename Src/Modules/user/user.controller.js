
import { userModel } from '../../../Database/models/user.model.js';
import { catchError } from '../../middleware/catchError.js';
import { AppError } from '../../utilites/AppError.js';
import { ApiFeature } from './../../utilites/apiFeature.js';


// this function is used to add user by admin only 
export const addUser = catchError(async (req, res, next) => {
    const user = await userModel.create(req.body)
    return res.json({ message: 'success', user });
});

// this function is used to get all users  
export const getAllUsers = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeature(userModel.find(), req.query)
        .fields().sort().pagenation().search().filter()
    let user = await apiFeature.mongooseQuery
    user && res.json({ message: 'success', page: apiFeature.pageNumber, user })
    !user && res.json({ message: 'user not found' })
})

// this function is used to get single user
export const getSingleUser = catchError(async (req, res, next) => {
    let user = await userModel.findById(req.params.id).populate('wishList')
    user && res.json({ message: 'success', user })
    !user && (next(new AppError('user not found', 404)))
})

// this function is used to update the data of admin only
export const updateUser = catchError(async (req, res, next) => {
    let user = await userModel.find(req.user._id)
    if (!user) return next(new AppError('not authorize', 404))
    if (req.body.email) {
        let emailExist = await userModel.findOne({ email: req.body.email })
        if (emailExist) { return next(new AppError('email already exist', 404)) }
    }
    let userUpdate = await userModel.updateOne({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    })
    userUpdate && res.json({ message: 'success', userUpdate })
    !userUpdate && res.json({ message: 'user not found' })
})
// this function is used to delete  admin  
export const deleteUser = catchError(async (req, res, next) => {
    let user = await userModel.findByIdAndDelete(req.user._id)
    user && res.json({ message: 'success', user })
    !user && res.json({ message: 'user not found' })
})

// this function is used to block user by admin  
export const BlockUser = catchError(async (req, res, next) => {
    let user = await userModel.findByIdAndUpdate(req.params.id, { isBlocked: true })
    user && res.json({ message: 'success user is blocked', user })
    !user && res.json({ message: 'user not found' })
})

// this function is used to unblock user by admin  
export const unBlockUser = catchError(async (req, res, next) => {
    let user = await userModel.findById(req.params.id)
    user.isBlocked = false;
    await user.save();
    user && res.json({ message: 'success user is unblocked', user })
    !user && res.json({ message: 'user not found' })
})


// this function is used to logout user by admin   
export const logout_User = catchError(async (req, res, next) => {
    let user = await userModel.findByIdAndUpdate(req.params.id, { isActive: false })
    user && res.json({ message: 'success user is deActive', user })
    !user && res.json({ message: 'user not found' })
})




