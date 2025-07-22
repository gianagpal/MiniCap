import express from 'express';
<<<<<<< HEAD
import { register, login, logout, sendVerifyOtp, verifyEmail } from '../controllers/authcontroller.js';
=======
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } from '../controllers/authcontroller.js';
>>>>>>> f313dcd (Initial commit from VS Code terminal)
import userAuth from '../middleware/userauth.js';

const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/register', register);

authRouter.post('/logout', logout); 

authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);

authRouter.post('/verify-account', userAuth, verifyEmail);

<<<<<<< HEAD
=======
authRouter.get('/is-auth', userAuth, isAuthenticated);

authRouter.get('/send-reset-otp',  sendResetOtp);

authRouter.get('/reset-password', resetPassword);

>>>>>>> f313dcd (Initial commit from VS Code terminal)
export default authRouter;
