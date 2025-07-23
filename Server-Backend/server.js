import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authroutes.js';
import userRouter from './routes/userroutes.js';
import careGroupRouter from './routes/careGrouproutes.js';
import careGroupMemberRouter from './routes/careGroupMemberRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());    

// API endpoints
app.get('/', (req, res) => res.send('API is running!'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/caregroups', careGroupRouter);
app.use('/api/caregroup-members', careGroupMemberRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
