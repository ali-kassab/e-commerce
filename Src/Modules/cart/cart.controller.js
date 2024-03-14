import { cartModel } from '../../../Database/models/cart.model.js';
import { catchError } from '../../middleware/catchError.js';
import { AppError } from '../../utilites/AppError.js';
import { productModel } from './../../../Database/models/product.model.js';
import { couponModel } from './../../../Database/models/coupon.model.js';


// this function is used to calculate the price
function calcTotalPrice(cart) {
    let totalPrice = 0
    cart.cartItems.forEach((item) => {
        totalPrice += item.quantity * item.price
    });
    cart.totalPrice = totalPrice
    if (cart.discount) {
        let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100
        cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    }
}
// this function is used to add products to the cart  
export const addToCart = catchError(async (req, res, next) => {

    let productExist = await productModel.findById(req.body.product)
    if (!productExist) return next(new AppError('Product not Exist', 404))
    if (req.body.quantity > productExist.quantity) return next(new AppError('sold out', 404))
    req.body.price = productExist.price
    let cartEixst = await cartModel.findOne({ user: req.user._id })
    if (!cartEixst) {
        let cart = await cartModel.create({ user: req.user._id, cartItems: [req.body] })
        calcTotalPrice(cart)
        await cart.save()
        cart && res.json({ msg: 'success', cart })
        !cart && next(new AppError('Failed to create cart', 404))
    } else {
        let item = await cartEixst.cartItems.find((item) => { return item.product == req.body.product })   // chech in case cart exist accually if product exist

        if (item) {
            if (item.quantity + req.body.quantity > productExist.quantity) { return next(new AppError('sold out')) }
            else { item.quantity += req.body.quantity || 1 }
        }
        else cartEixst.cartItems.push(req.body)

        calcTotalPrice(cartEixst)
        await cartEixst.save()
        res.json({ msg: 'success', cart: cartEixst })
    }


})

//this function is used to remove product from  the cart
export const removeItemFromCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOneAndUpdate({ user: req.user._id },
        { $pull: { cartItems: { product: req.params.id } } }, { new: true }).populate('cartItems.product')
    calcTotalPrice(cart)

    cart && res.json({ msg: 'success', cart })
    !cart && next(new AppError('cart not found', 404))
})

// this function is used to update quantity of product 
//check if product still exists and update quantity 
export const updateQuantity = catchError(async (req, res, next) => {
    let productExist = await productModel.findById(req.body.product)
    if (!productExist) return next(new AppError('product not found', 404))
    let cart = await cartModel.findOne({ user: req.user._id }).populate('cartItems.product')
    !cart && next(new AppError('cart not found', 404))

    let item = cart.cartItems.find((item) => {
        return item._id == req.params.id
    })
    item.quantity = req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    cart && res.json({ msg: 'success', cart })
})


// this function is used to get user cart information
export const getloggedUerCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id }).populate('cartItems.product')
    cart && res.json({ msg: 'success', cart })
    !cart && next(new AppError('cart not found', 404))
})

//this function is used to remove the cart
export const clearUerCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOneAndDelete({ user: req.user._id }, { new: true })
    cart && res.json({ msg: 'success', cart })
    !cart && next(new AppError('cart not found', 404))
})

//this function is used to apply coupon to the cart and calculate total Price After Discount
export const applyCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findOne({ code: req.body.coupon, expires: { $gte: Date.now() } })
    if (!coupon) return next(new AppError('Invalid coupon', 401))

    let cart = await cartModel.findOne({ user: req.user._id })
    !cart && next(new AppError('cart not found', 404))

    let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    cart.discount = coupon.discount
    await cart.save()
    res.json({ msg: 'success', cart })
})





