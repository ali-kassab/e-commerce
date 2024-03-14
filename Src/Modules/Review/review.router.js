import express from 'express';

import { validation } from '../../middleware/validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import { addReviewvali, paramIdvalidationReview, updatevalidationReview } from './review.validation.js';
import { addReview, deletereview, getReviews, getSinglereview, updatereview } from './review.controller.js';



export const reviewRouter = express.Router({ mergeParams: true })

reviewRouter.route('/')
    .post(protectedRoutes, allowedTo('user'), validation(addReviewvali), addReview)
    .get(getReviews)

reviewRouter.route('/:id')
    .get(validation(paramIdvalidationReview), getSinglereview)
    .put(protectedRoutes, allowedTo('user'), validation(updatevalidationReview), updatereview)
    .delete(protectedRoutes, allowedTo('user', 'admin'), validation(paramIdvalidationReview), deletereview)