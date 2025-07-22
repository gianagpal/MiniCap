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
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Carely Login',
            text: `Hello ${firstName},\n\nThank you for registering with Carely. We are excited to have you on board!\n\nBest regards,\nCarely Login Team`
        }; 

        await transporter.sendMail(mailOption);
         
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
            const otp = String(Math.floor(100000 + Math.random() * 900000)); // generate a 6-digit verification code
            user.verifyOtp   =  otp;
            user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000 ; // code valid for 1 day
            await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification Otp',
            text: `Your Otp is ${otp}. Verify your account within 24 hours.`
        }
        await transporter.sendMail(mailOption);
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

    // Check if the user is verified

    export const isAuthenticated = async (req, res) => {
        try {
            return res.json({ success: true});
        } catch (error) {
                return res.json({ success: false, message: error.message });
            }
        }

        // Send Password Reset Email

        export const sendResetOtp = async (req, res) => {
            const { email } = req.body;

            if (!email) {
                return res.json({ success: false, message: 'Email is required' });
            }

            try {
                const user = await userModel.findOne({ email});
                if (!user) {
                    return res.json({ success: false, message: 'User not found' });
                }  
                const otp = String(Math.floor(100000 + Math.random() * 900000)); 
                user.resetOtp = otp;
                user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000; 
                await user.save();

                const mailOption = {
                    from: process.env.SENDER_EMAIL,
                    to: user.email,
                    subject: 'Password Reset Otp',
                    text: `Your Otp for reseting your password is ${otp}. Use this Otp to proceed with reseting your password.`
                }; 
                await transporter.sendMail(mailOption);
                return res.json({ success: true, message: 'Password reset Otp sent to your email' });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        }

// Reset User password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if ( !email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Email, Otp and new password are required' });
    } 
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid Otp' });
        }
        if(user.resetOtpExpiredAt < Date.now()) {
            return res.json({ success: false, message: 'Otp expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpiredAt = 0;
        await user.save();
        return res.json({ success: true, message: 'Password reset successfully' });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
