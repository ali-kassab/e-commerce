import express from 'express';
import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import { DeleteCoupon, addCoupon, getallCoupons, getsingleCoupon, updateCoupons } from '../coupon/coupon.controller.js';
import { addcouponVali, paramIdvaliCoupon, updatevalidationCoupon } from '../coupon/coupon.validation.js';



export const couponRouter = express.Router({ mergeParams: true })

couponRouter.route('/')
    .post(protectedRoutes, allowedTo('admin'), validation(addcouponVali), addCoupon)
    .get(protectedRoutes, allowedTo('admin'), getallCoupons)

couponRouter.route('/:id')
    .get(protectedRoutes, allowedTo('admin'), validation(paramIdvaliCoupon), getsingleCoupon)
    .put(protectedRoutes, allowedTo('admin'), validation(updatevalidationCoupon), updateCoupons)
    .delete(protectedRoutes, allowedTo('admin'), validation(paramIdvaliCoupon), DeleteCoupon)
