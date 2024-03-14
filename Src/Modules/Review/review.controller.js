import { catchError } from '../../middleware/catchError.js';
import { reviewModel } from '../../../Database/models/review.model.js';
import { ApiFeature } from './../../utilites/apiFeature.js';
import { AppError } from './../../utilites/AppError.js';
import { productModel } from './../../../Database/models/product.model.js';


// this function is used to add new review 
export const addReview = catchError(async (req, res, next) => {
    req.body.user = req.user.id
    let productExist = await productModel.findById(req.body.product)
    if (!productExist) return next(new AppError('Product not found', 404));
    let userExist = await reviewModel.findOne({ user: req.user.id, product: req.body.product })
    if (userExist) return next(new AppError(' you created review before'))
    let review = await reviewModel.create(req.body)
    await review.populate('product')
    res.json({ msg: 'success', review })
})

// this function is used to get all reviews 
export const getReviews = catchError(async (req, res, next) => {

    let apiFeature = new ApiFeature(reviewModel.find(), req.query)
        .fields().sort().pagenation().search().filter()
    let review = await apiFeature.mongooseQuery
    review && res.json({ msg: 'success', page: apiFeature.pageNumber, review })
    !review && res.json({ msg: 'review not found' })
})

// this function is used to single reviews
export const getSinglereview = catchError(async (req, res, next) => {
    let review = await reviewModel.findById(req.params.id)
    review && res.json({ msg: 'success', review })
    !review && (next(new AppError('review not found', 404)))
})

// this function is used to update review
export const updatereview = catchError(async (req, res, next) => {
    const { text, rateAvg } = req.body
    let review = await reviewModel.findByIdAndUpdate({ _id: req.params.id, user: req.user.id }, { text, rateAvg }, { new: true })
    review && res.json({ msg: 'success', review })
    !review && (next(new AppError('review not found', 404)))
})

// this function is used to delete review
export const deletereview = catchError(async (req, res, next) => {
    let review = await reviewModel.findByIdAndDelete({ _id: req.params.id, user: req.user.id })
    review && res.json({ msg: 'success', review })
    !review && (next(new AppError('review not found', 404)))
})


