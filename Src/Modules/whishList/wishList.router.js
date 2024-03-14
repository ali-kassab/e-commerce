import express from 'express';

import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import { addToWishList, getLoggetWishList, removeFromWishList } from './wishList.controller.js';
import { addWishListvali, paramIdvalidationWishList } from './wishList.validation.js';



export const wishListRouter = express.Router({ mergeParams: true })

wishListRouter.route('/')
    .patch(protectedRoutes, allowedTo('user'), validation(addWishListvali), addToWishList)

wishListRouter.route('/:id')
    .get(protectedRoutes, allowedTo('user'), validation(paramIdvalidationWishList), getLoggetWishList)
    .delete(protectedRoutes, allowedTo('user'), validation(paramIdvalidationWishList), removeFromWishList)