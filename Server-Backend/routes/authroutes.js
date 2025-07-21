import express from 'express';
import { register, login, logout, sendVerifyOtp, verifyEmail } from '../controllers/authcontroller.js';
import userAuth from '../middleware/userauth.js';

const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/register', register);

authRouter.post('/logout', logout); 

authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);

authRouter.post('/verify-account', userAuth, verifyEmail);

export default authRouter;
