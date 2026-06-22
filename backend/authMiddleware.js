import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const actualToken = token.split(' ')[1] || token;
    
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}