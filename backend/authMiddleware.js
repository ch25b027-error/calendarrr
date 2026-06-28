import jwt from 'jsonwebtoken';
import User from './user.js'

export const requireAuth = (req, res, next) => {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const actualToken = tokenHeader.split(' ')[1] || tokenHeader;
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const checkUser = async (req, res, next) => {
  const tokenHeader = req.header('Authorization');

  if (tokenHeader) {
    try {
      const actualToken = tokenHeader.split(' ')[1] || tokenHeader;
      const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
      
      const user = await User.findById(decoded.userId).select('-password');
      
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  } else {
    req.user = null;
    next();
  }
};