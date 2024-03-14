import { userModel } from '../../../Database/models/user.model.js';
import { catchError } from '../../middleware/catchError.js';



// this function is uesd to add wishlist to the user
export const addToWishList = catchError(async (req, res, next) => {
    let wishList = await userModel.findOneAndUpdate(req.user._id, { $addToSet: { wishList: req.body.product } })
    await wishList.populate('wishList')
    wishList && res.json({ msg: 'success', wishList: wishList.wishList })
    !wishList && res.json({ msg: 'wishList not found' })
})

// this function is uesd to remove wishlist to the user
export const removeFromWishList = catchError(async (req, res, next) => {
    let wishList = await userModel.findOneAndUpdate(req.user._id, { $pull: { wishList: req.params.id } })
    await wishList.populate('wishList')
    wishList && res.json({ msg: 'success', wishList: wishList.wishList })
    !wishList && res.json({ msg: 'wishList not found' })
})
// this function is uesd to get wishlist to the user
export const getLoggetWishList = catchError(async (req, res, next) => {
    let { wishList } = await userModel.findById(req.user._id).populate('wishList')
    wishList && res.json({ msg: 'success', wishList })
    !wishList && res.json({ msg: 'wishList not found' })
})




