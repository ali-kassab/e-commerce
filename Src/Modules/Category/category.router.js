import express from 'express';
import { addCategory, deleteCategory, getCategories, getSingleCategory, updateCategory } from './category.controller.js';
import { addcategoryvali, paramIdvalidation, updatevalidation } from './category.validation.js';
import { uploadSingleFile } from '../../uploads/uploads.js';
import { validation } from './../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';


export const categoryRouter = express.Router()

categoryRouter.route('/')
    .post(protectedRoutes, allowedTo('admin'), uploadSingleFile('image'), validation(addcategoryvali), addCategory)
    .get(getCategories)

categoryRouter.route('/:id')
    .get(validation(paramIdvalidation), getSingleCategory)
    .put(protectedRoutes, uploadSingleFile('img'), validation(updatevalidation), updateCategory)
    .delete(protectedRoutes, validation(paramIdvalidation), deleteCategory)