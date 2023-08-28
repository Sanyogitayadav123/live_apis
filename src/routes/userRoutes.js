import express from 'express'
import { signUpController } from '../controller/userController.js'

const userRoutes = express.Router()

userRoutes.post('/signup',signUpController)

export default userRoutes