import express from 'express';

import { addsubcategoryvali, paramIdvalidationsub, updatevalidationsub } from './subcategory.validation.js';
import { addsubCategory, deletesubCategory, getSinglesubCategory, getsubCategories, isCategoryExist, updatesubCategory } from './subcategory.controller.js';
import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import { uploadSingleFile } from '../../uploads/uploads.js';



export const subcategoryRouter = express.Router({ mergeParams: true })

subcategoryRouter.route('/')
    .post(protectedRoutes, allowedTo('admin'), uploadSingleFile('image'), isCategoryExist
        , validation(addsubcategoryvali),
        addsubCategory)
    .get(getsubCategories)

subcategoryRouter.route('/:id')
    .get(validation(paramIdvalidationsub), getSinglesubCategory)
    .put(protectedRoutes, allowedTo('admin'), validation(updatevalidationsub), updatesubCategory)
    .delete(protectedRoutes, allowedTo('admin'), validation(paramIdvalidationsub), deletesubCategory)
