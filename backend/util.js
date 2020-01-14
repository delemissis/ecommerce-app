import jwt from "jsonwebtoken";
import {JWT_SECRET} from './config'

export const authenticated = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};
