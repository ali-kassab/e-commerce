import express from 'express';
import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import { DeleteCoupon, addCoupon, getallCoupons, getsingleCoupon, updateCoupons } from '../coupon/coupon.controller.js';
import { addcouponVali, paramIdvaliCoupon, updatevalidationCoupon } from '../coupon/coupon.validation.js';



export const couponRouter = express.Router({ mergeParams: true })

couponRouter.route('/')
    .post(protectedRoutes, allowedTo('user'), validation(addcouponVali), addCoupon)
    .get(protectedRoutes, allowedTo('user'), getallCoupons)

couponRouter.route('/:id')
    .get(protectedRoutes, allowedTo('user'), validation(paramIdvaliCoupon), getsingleCoupon)
    .put(protectedRoutes, allowedTo('user'), validation(updatevalidationCoupon), updateCoupons)
    .delete(protectedRoutes, allowedTo('user'), validation(paramIdvaliCoupon), DeleteCoupon)
