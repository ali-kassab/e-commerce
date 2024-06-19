import express from 'express';

import { validation } from '../../middleware/validation.js';
import {  protectedRoutes } from '../auth/auth.controller.js';
import { addToWishList, getLoggetWishList, removeFromWishList } from './wishList.controller.js';
import { addWishListvali, paramIdvalidationWishList } from './wishList.validation.js';



export const wishListRouter = express.Router({ mergeParams: true })

wishListRouter.route('/')
    .patch(protectedRoutes, validation(addWishListvali), addToWishList)
    .get(protectedRoutes, getLoggetWishList)


wishListRouter.route('/:id')
    .delete(protectedRoutes, validation(paramIdvalidationWishList), removeFromWishList)