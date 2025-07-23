import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  // Option 1: From Authorization header (recommended for APIs like Postman)
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to req for controller use
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

  } else {
    // Option 2: From cookies (in case of browser)
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token in cookie" });
    }
  }
};

export default userAuth;
