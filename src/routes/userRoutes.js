import express from 'express'
import { signInController, signUpController } from '../controller/userController.js'

const userRoutes = express.Router()

userRoutes.post('/signup',signUpController)
userRoutes.post('/signin',signInController)


export default userRoutes