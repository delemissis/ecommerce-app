import jwt from 'jsonwebtoken';
import config from './config';

export const isAuthenticated = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Token is not valid',
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send({
      success: false,
      message: 'Admin persmission has not been granted.',
    });
  }
};
