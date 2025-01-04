const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const protect = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }
  const token = authHeader.replace('Bearer ', ''); // Extract token from headers

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded.id; // Attach the user ID to the request
    next(); // Proceed to the next middleware or route
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

module.exports = protect;
