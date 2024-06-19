import express from 'express';
import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import { addToCart, applyCoupon, clearUerCart, getloggedUerCart, removeItemFromCart, updateQuantity } from './cart.controller.js';
import { addcartVali, paramIdvaliCart, updatevalidationcart } from './cart.validation.js';
import { couponVali } from '../coupon/coupon.validation.js';




export const cartRouter = express.Router({ mergeParams: true })
cartRouter.route('/')
    .post(protectedRoutes, validation(addcartVali), addToCart)
    .get(protectedRoutes, getloggedUerCart)
    .delete(protectedRoutes, clearUerCart)


cartRouter.post('/applyCoupon', protectedRoutes, validation(couponVali), applyCoupon)

cartRouter.route('/:id')
    .put(protectedRoutes, validation(updatevalidationcart), updateQuantity)
    .delete(protectedRoutes, validation(paramIdvaliCart), removeItemFromCart)

