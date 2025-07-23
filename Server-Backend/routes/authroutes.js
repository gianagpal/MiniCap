import express from 'express';

import { register, login, logout,  verifyEmail } from '../controllers/authcontroller.js';

import userAuth from '../middleware/userauth.js';

const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/register', register);

authRouter.post('/logout', logout); 

authRouter.get('/verify', verifyEmail);



export default authRouter;
