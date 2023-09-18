import express from 'express';
import { signInController, signUpController, forgotePasswordController, resetPasswordController, updateUserController, getUserByidController } from '../controller/userController.js';
import signUpValidationRules, { userUpdateValidationRules } from '../middleware/validation.js';
import imageUpload from '../middleware/imageUpload.js';

const userRoutes = express.Router();

userRoutes.post('/signup', imageUpload.single('userImage'), signUpValidationRules, signUpController);
userRoutes.post('/signin', signInController);
userRoutes.post('/forgot-password', forgotePasswordController);
userRoutes.post('/reset-password', resetPasswordController);
userRoutes.put('/update-user/:id', imageUpload.single('userImage'), userUpdateValidationRules, updateUserController);
userRoutes.get('/get-user-by-id/:id', getUserByidController);

export default userRoutes