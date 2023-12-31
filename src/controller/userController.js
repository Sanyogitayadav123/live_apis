import bcrypt from 'bcrypt';
import UserModal from '../model/userModel.js';
import { StatusCodes } from 'http-status-codes';
import Sib from 'sib-api-v3-sdk';
import { validationResult } from 'express-validator';
import path from 'path';
import fs from 'fs';
import sendMail from '../../utils/sendMail.js';

const __dirname = path.resolve();

export const signUpController = async (req, res) => {
  // Extract data from the request body
  const { name, email, phone, password, image } = req.body;
  const userImage = req?.file?.filename;
  // Validate request data using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }
  try {
    const isExist = await UserModal.findOne({ email: req?.body?.email });
    if (isExist) {
      return { error: 'Email already exists!!' };
    }
    const updates = Object.keys(body);
    const allowedUpdates = ['name', 'phone'];
    const isValidUpdates = updates.every((update) =>
      allowedUpdates.includes(update),
    );
    if (!isValidUpdates) {
      throw new Error(` Invalid updates`);
    }
    if (password) {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);
      const data = await UserModal.create({
        name,
        email,
        phone,
        password: hashPassword,
        userImage,
      });
      return res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: 'Successful user signup', user: data });
    } else {
      const data = await UserModal.create({
        name,
        email,
        phone,
        userImage: image,
      });
      return res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: 'Successful user signup', user: data });
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Unsuccessful user signup',
      error: err.message,
    });
  }
};

export const signInController = async (req, res) => {
  const { email, password } = req?.body;
  try {
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ passwordError: 'Password not matched' });
    }
    const token = await user.generateAuthToken();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'User login is succesfull',
      user: user,
      token: token,
    });
  } catch (err) {
    return res.status(StatusCodes.CREATED).json({
      success: false,
      message: 'Unsuccesfull user',
      Error: err.message,
    });
  }
};

// export const forgotePasswordController = async (req, res) => {
//   const email = req.body.email;
//   try {
//     const user = await UserModal.findOne({ email: email });
//     if (!user) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         success: false,
//         message: 'User not found',
//       });
//     }
//     const otp = Math.random().toString().substring(2, 8);
//     const currentDate = new Date();
//     const expire = currentDate.setMinutes(currentDate.getMinutes() + 5);
//     user.otp = {
//       value: otp,
//       expire,
//     };

//     const client = Sib.ApiClient.instance;
//     const apiKey = client.authentications['api-key'];
//     apiKey.apiKey = process.env.API_KEY;
//     const tranEmailApi = new Sib.TransactionalEmailsApi();

//     const sender = {
//       email: 'sanyogitavkaps@gmail.com',
//       name: `sanyogitavkaps@gmail.com`,
//     };

//     const receivers = [
//       {
//         email: req.body.email,
//       },
//     ];

//     await tranEmailApi.sendTransacEmail({
//       sender,
//       to: receivers,
//       subject: 'Password Reset',
//       textContent: 'Dear user, please reset your password',
//       htmlContent: `
//       <div style="font-family: Arial, sans-serif;">
//       <h2>Password Reset</h2>
//       <p>Dear user,</p>
//       <p>To reset your password, click on the following link:</p>
//       <p><a href="https://genuine-smakager-5a1cc9.netlify.app/ResetPassword">Reset Password</a></p>
//       <p>Your verification code <strong>${otp}</strong> is valid for 5 minutes</p>
//       <p>Best regards,<br>Thank you</p>
//       </div>
//       `,
//     });

//     await user.save();
//     return res.status(StatusCodes.OK).json({
//       success: true,
//       message: 'OTP sent successfully',
//     });
//   } catch (error) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const resetPasswordController = async (req, res) => {
  const { email, otp, password } = req.body;
  try {
    const user = await UserModal.findOne({ email });

    if (user.otp.value !== otp) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: 'One-time password is incorrect' });
    }
    if (user.otp.expire < new Date()) {
      user.otp = undefined;
      await user.save();
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        error: 'Temporary password (OTP) has expired.',
      });
    }

    const newPasswordMatch = await bcrypt.compare(password, user.password);
    if (newPasswordMatch) {
      throw new Error('Current password and new password cannot be the same.');
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    user.password = hashPassword;
    user.otp = undefined;
    await user.save();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Password has been changed.',
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'An error occurred while resetting the password',
      error: error.message,
    });
  }
};

export const updateUserController = async (req, res) => {
  const id = req?.params?.id;
  const body = req?.body;
  const newImage = req?.file?.filename; // New image filename
  const errors = validationResult(req); // Validate the request, not just the body
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

  try {
    const user = await UserModal.findByIdAndUpdate(
      id,
      { ...body, newImage },
      { new: true },
    );

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }

    if (newImage) {
      if (user.userImage) {
        const imagePath = path.join(
          __dirname,
          'public',
          'userImage',
          user.userImage,
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        } else {
          console.log(`File does not exist at ${imagePath}`);
        }
      }
      user.userImage = newImage;
    }

    await user.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'User update is successful',
      user: user,
    });
  } catch (err) {
    console.error('err', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update user',
      error: err.message,
    });
  }
};

export const getUserByidController = async (req, res) => {
  const { id } = req?.params;
  try {
    const data = await UserModal.findById(id);
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: 'Fetched user by Id', user: data });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'failed',
      error: err.message,
    });
  }
};

export const forgotePasswordController = async (req, res) => {
  try {
    const email = req?.body?.email;
    const user = await UserModal.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user) {
      const otp = Math.random().toString().substring(2, 8);
      const currentDate = new Date();
      const expire = currentDate.setMinutes(currentDate.getMinutes() + 5);
      user.otp = {
        value: otp,
        expire,
      };
      const mail = await sendMail({
        from: `"Shopping " <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: 'Forgot Password',
        text: `Your OTP is ${otp} valid for 5 minutes`,
        html:
         `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset</h2>
          <p>Dear user,</p>
          <p>To reset your password, click on the following link:</p>
          <p><a href="https://genuine-smakager-5a1cc9.netlify.app/ResetPassword">Reset Password</a></p>
          <p>Your verification code <strong>${otp}</strong> is valid for 5 minutes</p>
          <p>Best regards,<br>Thank you</p>
        </div>`,
      });

      if (mail === 'success') {
        await user.save();
        return res.status(StatusCodes.OK).json({
          success: true,
          message: 'OTP sent successfully',
        });
      }
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
