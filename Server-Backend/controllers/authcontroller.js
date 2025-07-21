import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../Model/user.js';
import transporter from '../config/nodemailer.js';


export const register = async (req, res) => {
    const { firstName,lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.json({ success: false, message: 'All fields are required' });
    }

    try {

        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

            const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: email,
            password: hashedPassword,
        });
        await user.save();

        const token = jwt.sign(
            { id: user._id, },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 7 * 24 *60 *60 * 1000, // 7 days
        });

        // sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Carely Login',
            text: `Hello ${firstName},\n\nThank you for registering with Carely. We are excited to have you on board!\n\nBest regards,\nCarely Login Team`
        }; 

        await transporter.sendMail(mailOptions);
         
        return res.json({ success: true});
        
    } catch (error) {
            res.json({ success: false, message: error.message });
        }
    };

    export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }
    try {
        const user = await userModel.findOne({
            email
        }); 
        if (!user) {
            return res.json({ success: false, message: 'Invalid Email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );  
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.json({ success: true});
    }
    catch (error) {
        res.json({ success: false, message: 'Error logging in', error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
        });
        return res.json({ success: true, message: 'Logout successful' });
    } catch (error) {
       return res.json({ success: false, message: error.message });
    }
};

// send verification email
export const sendVerifyOtp = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
            return res.json({ success: false, message: 'Account already verified' });
        }
            const otp = String(Math.floor (100000 + Math.random() * 900000)); // generate a 6-digit verification code
            user.verifyOtp = otp;
            user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000 ; // code valid for 1 day
            await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification Code',
            text: `Your Code is ${verifyCode}. Verify your account within 24 hours.`
        }
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Verification code sent to your email' });

        }
        catch (error) {
            res.json({ success: false, message: error.message }); 
        }
    }


    export const verifyEmail = async (req, res) => {
        const {userId, otp} = req.body;

        if(!userId || !otp) {
            return res.json({ success: false, message: 'User ID and verification otp are required' });
        }

        try {
            const user = await userModel.findById(userId);

            if (!user) {
                return res.json({ success: false, message: 'User not found' });
            }
            if (user.verifyOtp === '' || user.verifyOtp !== otp) {
                return res.json({ success: false, message: 'Invalid OTP' });
            }
            if (user.verifyOtpExpiredAt < Date.now()) {
                return res.json({ success: false, message: 'Verification otp expired' });
            } 
            user.isAccountVerified = true;
            user.verifyOtp = '';
            user.verifyOtpExpiredAt = 0;
            await user.save();
            return res.json({ success: true, message: 'Account verified successfully' });
        }

        catch (error) {
            return res.json({ success: false, message: error.message });
        }
    }