

import express from 'express';

import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import { addToAddress, getaddress, removeAddress } from './address.controller.js';
import { addAddressvali, paramIdvaliaddress } from './address.validation.js';



export const addressRouter = express.Router({ mergeParams: true })

addressRouter.route('/')
    .patch(protectedRoutes,  validation(addAddressvali), addToAddress)
    .get(protectedRoutes,  getaddress)


addressRouter.route('/:id')
    .delete(protectedRoutes,  validation(paramIdvaliaddress), removeAddress)