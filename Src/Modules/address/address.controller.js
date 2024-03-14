import { userModel } from '../../../Database/models/user.model.js';
import { catchError } from '../../middleware/catchError.js';
import { AppError } from '../../utilites/AppError.js';



// this function is used to add addresses 
export const addToAddress = catchError(async (req, res, next) => {
    let { addresses } = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { addresses: req.body } }, { new: true })
    if (addresses.length > 3) {
        next(new AppError('you must add 3 address only', 401))
    }
    addresses && res.json({ msg: 'success', addresses })
    !addresses && next(new AppError('address not found', 404))
})


// this function is used to remove addresses 
export const removeAddress = catchError(async (req, res, next) => {
    let { addresses } = await userModel.findByIdAndUpdate(req.user._id, { $pull: { addresses: { _id: req.params.id } } }, { new: true })
    addresses && res.json({ msg: 'success', addresses })
    !addresses && next(new AppError('address not found', 404))
})


// this function is used to get addresses 
export const getaddress = catchError(async (req, res, next) => {
    let { addresses } = await userModel.findById(req.user._id)
    addresses && res.json({ msg: 'success', addresses })
    !addresses && next(new AppError('address not found', 404))
})




