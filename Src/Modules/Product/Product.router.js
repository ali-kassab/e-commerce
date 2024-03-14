import express from 'express';
import { uploadFileds } from '../../uploads/uploads.js';
import { validation } from '../../middleware/validation.js';
import { addProductvali, paramIdvalidation, updatevalidation } from './Product.validation.js';
import { addproduct, deleteproduct, getAllProduct, getSingleproduct, updateproduct } from './Product.controller.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';


export const productRouter = express.Router()

productRouter.route('/')
    .post(protectedRoutes, allowedTo('admin'),uploadFileds([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 10 },
    ]), validation(addProductvali), addproduct)
    .get(getAllProduct)

productRouter.route('/:id')
    .get(validation(paramIdvalidation), getSingleproduct)
    .put(protectedRoutes, allowedTo('admin'),uploadFileds([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 10 },
    ]), validation(updatevalidation), updateproduct)
    .delete(protectedRoutes, allowedTo('admin'),validation(paramIdvalidation), deleteproduct)