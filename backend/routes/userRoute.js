import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { isAuthenticated, getToken } from "../util";
const router = express.Router();

import { logging } from "../logging_functions.js";
import { request_duration } from "../requests_duration";
import AppUser from "../models/user.js";

router.put(
  "/:id",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    if (req.params.id !== req.user._id && !req.user.isAdmin) {
      return res.status(401).send({
        success: false,
        message: "Can not update this user.",
      });
    }
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found." });
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    console.log("REGISTER - SERVER");
    const start = process.hrtime();
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (!newUser) {
      console.log("REGISTER - ERROR");
      res.status(401).send({ message: "User did not registered" });
      const mongoObject = logging(req, res);
      await mongoObject.save();
      request_duration(start, req, res);
      // return;
    } else {
      console.log("REGISTER - SUCCESS");
      res.status(201).send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
      const mongoObject = logging(req, res);
      await mongoObject.save();
      request_duration(start, req, res);
    }
  })
);
router.post(
  "/signin",
  asyncHandler(async (req, res) => {
    console.log("SIGN IN - SERVER");
    const start = process.hrtime();

    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!signinUser) {
      console.log("SIGN IN - ERROR");
      const duration = request_duration(start, req, res);
      console.log("!!!DURATION: " + duration);
      res.status(401).send({ message: "Invalid email or password." });
      const mongoObject = logging(req, res, duration);
      await mongoObject.save();
      return;
    } else {
      const duration = request_duration(start, req, res);
      res.status(200).send({
        _id: signinUser._id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
        message: "Success!",
      });
      // const user1 = new AppUser({
      //   user: signinUser.name,
      // });
      // na vrw tropo na valw to onoma tou user sto db
      // await user1.save();
      const mongoObject = logging(req, res, duration);
      await mongoObject.save();
    }
  })
);

export default router;
