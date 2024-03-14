import express from 'express';
import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import { createCashOrder, createCheckOutsession, getSpecificOrder, getallOrders } from './order.controller.js';
import { createOrderVali, paramIdvaliorder } from './order.validation.js';


export const orderRouter = express.Router({ mergeParams: true })
orderRouter.route('/')
    .get(protectedRoutes, allowedTo('user'), getSpecificOrder)
orderRouter.route('/allOrders')
    .get(protectedRoutes, allowedTo('admin'), getallOrders)

orderRouter.route('/:id').post(protectedRoutes, allowedTo('user'), validation(createOrderVali), createCashOrder)
orderRouter.route('/checkout_session/:id').post(protectedRoutes, allowedTo('user'), validation(createOrderVali), createCheckOutsession)

