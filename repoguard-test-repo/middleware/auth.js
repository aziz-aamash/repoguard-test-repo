const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecret123';

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    console.log('auth failed', err.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = { requireAuth, JWT_SECRET };
