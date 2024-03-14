import { catchError } from '../../middleware/catchError.js';
import { AppError } from '../../utilites/AppError.js';
import { couponModel } from './../../../Database/models/coupon.model.js';



// this function is used to add a new coupon
export const addCoupon = catchError(async (req, res, next) => {
    let couponEixst = await couponModel.findOne({ code: req.body.code })
    if (couponEixst) return next(new AppError('coupon already Exist', 404))
    let coupon = await couponModel.create(req.body)
    res.json({ msg: 'success', coupon })
})

// this function is used to get all coupons
export const getallCoupons = catchError(async (req, res, next) => {
    let coupons = await couponModel.find()
    coupons && res.json({ msg: 'success', coupons })
    !coupons && next(new AppError('coupons not found', 404))
})

// this function is used to get single coupon
export const getsingleCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findById(req.params.id)
    coupon && res.json({ msg: 'success', coupon })
    !coupon && next(new AppError('coupons not found ', 404))
})

// this function is used to update coupon information
export const updateCoupons = catchError(async (req, res, next) => {
    let coupon = await couponModel.findByIdAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    coupon && res.json({ msg: 'success', coupon })
    !coupon && next(new AppError('coupons not found', 404))
})

// this function is used to delete coupon
export const DeleteCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findByIdAndDelete({ _id: req.params.id, user: req.user._id })
    coupon && res.json({ msg: 'success', coupon })
    !coupon && next(new AppError('coupons not found', 404))
})




