import express from 'express';

import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } from '../controllers/authcontroller.js';

import userAuth from '../middleware/userauth.js';

const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/register', register);

authRouter.post('/logout', logout); 

authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);

authRouter.post('/verify-account', userAuth, verifyEmail);

authRouter.get('/is-auth', userAuth, isAuthenticated);

authRouter.get('/send-reset-otp',  sendResetOtp);

authRouter.get('/reset-password', resetPassword);

export default authRouter;
