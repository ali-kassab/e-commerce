import express from 'express';
import { uploadSingleFile } from '../../uploads/uploads.js';
import { addBrandvali, paramIdvalidation, updatevalidation } from './Brand.validation.js';
import { addBrand, deletebrand, getBrand, getSinglebrand, updatebrand } from './Brand.controller.js';
import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import { createHandler } from 'graphql-http/lib/use/express';
import { brandSchemaGraph } from './graphQl/Brand.schema.js';


export const brandRouter = express.Router()

brandRouter.use('/graphQl', createHandler({ schema: brandSchemaGraph }))

brandRouter.route('/')
    .post(protectedRoutes, allowedTo('admin'), uploadSingleFile('logo'), validation(addBrandvali), addBrand)
    .get(getBrand)

brandRouter.route('/:id')
    .get(validation(paramIdvalidation), getSinglebrand)
    .put(protectedRoutes, uploadSingleFile('logo'), validation(updatevalidation), updatebrand)
    .delete(protectedRoutes, validation(paramIdvalidation), deletebrand)