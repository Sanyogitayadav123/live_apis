import express from 'express'
import { signInController, signUpController,forgotePasswordController, resetPasswordController } from '../controller/userController.js'

const userRoutes = express.Router()

userRoutes.post('/signup',signUpController)
userRoutes.post('/signin',signInController)
userRoutes.post('/forgot-password',forgotePasswordController)
userRoutes.post('/reset-password',resetPasswordController)




export default userRoutes