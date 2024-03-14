import express from 'express';
import { validation } from '../../middleware/validation.js';
import { checkEmail } from '../../middleware/checkEmail.js';
import { changePassword, login, protectedRoutes, signup } from './auth.controller.js';
import { changePasswordVali, loginShecma, signUpShecma } from './auth.validation.js';



export const authRouter = express.Router({ mergeParams: true })

authRouter
    .post('/signup', validation(signUpShecma), checkEmail, signup)
    .post('/login', validation(loginShecma), login)
    .patch('/changePassword', protectedRoutes, validation(changePasswordVali), changePassword)