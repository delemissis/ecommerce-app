import express from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import config from '../config';
import { authenticated } from '../util';

const router = express.Router();

const getToken = (user) => jwt.sign(
  {
    _id: user._id,
    email: user.email,
    name: user.name,
  },
  config.JWT_SECRET,
  {
    expiresIn: '48h',
  },
);
// List All Users
router.get('/', authenticated, (req, res) => {
  User.find({}, (err, categories) => {
    res.send(categories);
  });
});
// Update User
router.put('/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: getToken(updatedUser),
    });
  } else {
    throw Error('User not found.');
  }
}));
// Create User
router.post('/register', asyncHandler(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  res.status(201).send({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: getToken(newUser),
  });
}));

router.post('/signin', asyncHandler(async (req, res) => {
  const signinUser = await User.findOne(
    { email: req.body.email, password: req.body.password },
  );
  if (!signinUser) {
    res.status(401).send({ message: 'Invalid email or password.' });
    return;
  }
  res.send({
    _id: signinUser._id,
    name: signinUser.name,
    email: signinUser.email,
    token: getToken(signinUser),
  });
}));

export default router;
