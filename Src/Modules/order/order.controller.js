import { cartModel } from '../../../Database/models/cart.model.js';
import { orderModel } from '../../../Database/models/order.model.js';
import { catchError } from '../../middleware/catchError.js';
import { AppError } from '../../utilites/AppError.js';
import { productModel } from './../../../Database/models/product.model.js';
import Stripe from 'stripe';

// this function is used to create cash order and delete cart 
// increase sold and decrease items of product 
export const createCashOrder = catchError(async (req, res, next) => {

    const cartExist = await cartModel.findById(req.params.id)
    if (!cartExist) { return next(new AppError('Cart not found', 404)) }
    let totalPrice = cartExist.totalPriceAfterDiscount ? cartExist.totalPriceAfterDiscount : cartExist.totalPrice
    const order = await orderModel.create(
        {
            user: req.user.id,
            orderItems: cartExist.cartItems,
            totalPrice,
            shippingAddress: req.body.shippingAddress,
        },
    )

    let options = cartExist.cartItems.map((item) => {
        return {
            updateOne: {
                "filter": { _id: item.product },
                "update": { $inc: { sold: item.quantity, quantity: -item.quantity } }
            }
        }
    })
    await productModel.bulkWrite(options)
    await cartModel.findByIdAndDelete(req.params.id)
    res.json({ msg: 'success', order })
})

//this is used to get Specific Order and populate on the data that will be usefull to frontend
export const getSpecificOrder = catchError(async (req, res, next) => {

    const orderExist = await orderModel.findOne({ user: req.user.id })
        .populate({ path: 'user', select: 'name email _id' })
        .populate({
            path: 'orderItems.product'
        });
    if (!orderExist) return next(new AppError('order not Exist', 404))
    res.json({ msg: 'success', orderExist })
})

//this is used to get all Orders and populate on the data that will be usefull to frontend
export const getallOrders = catchError(async (req, res, next) => {

    const orders = await orderModel.find({})
        .populate({ path: 'user', select: 'name email _id' })
        .populate({
            path: 'orderItems.product'
        });
    if (!orders) return next(new AppError('orders not Exist', 404))
    res.json({ msg: 'success', orders })
})

// this function is used to create CheckOut session 
// using stripe api   
export const createCheckOutsession = catchError(async (req, res, next) => {
    const stripe = new Stripe('sk_test_51OjjcABG8zwmOQwBwkz5X2NWAbnAZH2bJBdTSYJAoWRaVhSUb0oJeHJC5vVTHGEDl717wsqeLT2aXqQGP4kdh5gr00CnvCm1mK');
    const cartExist = await cartModel.findById(req.params.id)
    if (!cartExist) { return next(new AppError('cart not Exist', 404)) }
    let totalPrice = cartExist.totalPriceAfterDiscount ? cartExist.totalPriceAfterDiscount : cartExist.totalPrice

    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalPrice * 100,
                    product_data: {
                        name: req.user.name
                    }
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: "https://www.google.com/",  //front end url
        cancel_url: "https://www.google.com/",    //front end url
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress
    })
    res.json({ msg: 'success', session })
})


