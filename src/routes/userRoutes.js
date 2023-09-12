import express from 'express'
import { signInController, signUpController,forgotePasswordController, resetPasswordController, updateUserController, getUserByidController } from '../controller/userController.js'
import signUpValidationRules from '../middleware/validation.js'
import imageUpload from '../middleware/imageUpload.js'

const userRoutes = express.Router()

userRoutes.post('/signup',signUpValidationRules,imageUpload.single('userImage'),signUpController)
userRoutes.post('/signin',signInController)
userRoutes.post('/forgot-password',forgotePasswordController)
userRoutes.post('/reset-password',resetPasswordController)
userRoutes.put('/update-user/:id',signUpValidationRules,imageUpload.single('userImage'),updateUserController)
userRoutes.get('/get-user-by-id/:id',getUserByidController)






export default userRoutes