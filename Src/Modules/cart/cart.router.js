import express from 'express';
import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import { addToCart, applyCoupon, clearUerCart, getloggedUerCart, removeItemFromCart, updateQuantity } from './cart.controller.js';
import { addcartVali, paramIdvaliCart, updatevalidationcart } from './cart.validation.js';




export const cartRouter = express.Router({ mergeParams: true })
cartRouter.route('/')
    .post(protectedRoutes, allowedTo('user'), validation(addcartVali), addToCart)
    .get(protectedRoutes, allowedTo('user'), getloggedUerCart)
    .delete(protectedRoutes, allowedTo('user'), clearUerCart)


cartRouter.post('/applyCoupon', protectedRoutes, allowedTo('user'), applyCoupon)

cartRouter.route('/:id')
    .put(protectedRoutes, allowedTo('user'), validation(updatevalidationcart), updateQuantity)
    .delete(protectedRoutes, allowedTo('user'), validation(paramIdvaliCart), removeItemFromCart)

