import express from 'express';
import { validation } from '../../middleware/validation.js';
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from './user.controller.js';
import { addUservali, paramIdvalidationUser, updatevalidationUser } from './user.validation.js';
import { checkEmail } from '../../middleware/checkEmail.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

export const userRouter = express.Router({ mergeParams: true })

userRouter.route('/')
    .post(protectedRoutes, allowedTo('admin'), validation(addUservali), checkEmail, addUser)
    .get(getAllUsers)
    .put(protectedRoutes, allowedTo('admin'), validation(updatevalidationUser), updateUser)
    .delete(protectedRoutes, allowedTo('admin'), validation(paramIdvalidationUser), deleteUser)

userRouter.route('/:id')
    .get(validation(paramIdvalidationUser), getSingleUser)
