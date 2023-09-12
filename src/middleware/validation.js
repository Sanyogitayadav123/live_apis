import { body } from 'express-validator';


const signUpValidationRules = [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];


export default signUpValidationRules