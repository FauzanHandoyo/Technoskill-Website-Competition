const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_jwt_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log("Auth Header:", authHeader); // Log the auth header
  console.log("Token:", token); // Log the token

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error("Token verification error:", err); // Log token verification errors
      return res.sendStatus(403); // Forbidden
    }

    console.log("User:", user); // Log the decoded user
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
