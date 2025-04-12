const jwt = require('jsonwebtoken');
const secret = 'your_secret_key'; // should match the one used while logging in

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Invalid token format' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ msg: 'Token verification failed' });
    req.user = user;
    next();
  });
};
