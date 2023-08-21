const jwt = require('jsonwebtoken');
const secretKey =process.env.SECRET_KEY;

const verifyTokenMiddleware =(requiredUserType) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token not provided.' });
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid authentication token.' });
    }
    if (decodedToken.userType !== requiredUserType) {
      return res.status(403).json({ message: 'Unauthorized access.' });
  }

    req.user = decodedToken;
    next();
  });
};

module.exports = verifyTokenMiddleware;


