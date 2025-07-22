 import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const token = req.cookies;

<<<<<<< HEAD
=======

>>>>>>> f313dcd (Initial commit from VS Code terminal)
if (!token) {
    return res.json({ success: false, message: 'Unauthorized access Try Again' });
} 

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
<<<<<<< HEAD
=======
        console.log('Auth Header:', req.headers.authorization);

>>>>>>> f313dcd (Initial commit from VS Code terminal)

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: 'Invalid token' });
        }
        next();
<<<<<<< HEAD
    } catch  {
=======
    } catch(error)  {
>>>>>>> f313dcd (Initial commit from VS Code terminal)
        return res.json({ success: false, message: error.message });
    }
};

export default userAuth;
