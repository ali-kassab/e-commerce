

import express from 'express';

import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import { addToAddress, getaddress, removeAddress } from './address.controller.js';
import { addAddressvali, paramIdvaliaddress } from './address.validation.js';



export const addressRouter = express.Router({ mergeParams: true })

addressRouter.route('/')
    .patch(protectedRoutes, allowedTo('user'), validation(addAddressvali), addToAddress)
    .get(protectedRoutes, allowedTo('user'), getaddress)


addressRouter.route('/:id')
    .delete(protectedRoutes, allowedTo('user'), validation(paramIdvaliaddress), removeAddress)