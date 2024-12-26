const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Attach decoded admin information
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

module.exports = protect;
