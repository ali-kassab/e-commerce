import express from 'express';
import { validation } from '../../middleware/validation.js';
import { BlockUser, addUser, deleteUser, getAllUsers, getSingleUser, logout_User, unBlockUser, updateUser } from './user.controller.js';
import { addUservali, paramIdvalidationUser, updatevalidationUser } from './user.validation.js';
import { checkEmail } from '../../middleware/checkEmail.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

export const userRouter = express.Router({ mergeParams: true })

userRouter.route('/')
    .post(protectedRoutes, allowedTo('admin'), validation(addUservali), checkEmail, addUser)
    .get(getAllUsers)
    .put(protectedRoutes, allowedTo('admin'), validation(updatevalidationUser), updateUser)
    .delete(protectedRoutes, allowedTo('admin'), deleteUser)

userRouter.route('/:id')
    .get(validation(paramIdvalidationUser), getSingleUser)
    .patch(protectedRoutes, allowedTo('admin'), validation(paramIdvalidationUser), BlockUser)
    .patch(protectedRoutes, allowedTo('admin'), validation(paramIdvalidationUser), BlockUser)
    .put(protectedRoutes, allowedTo('admin'), validation(paramIdvalidationUser), logout_User)

userRouter.route('/manage/:id')
    .put(protectedRoutes, allowedTo('admin'), validation(paramIdvalidationUser), unBlockUser)