import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel";
import { isAuthenticated, isAdmin } from "../util";
import { logging } from "../logging_functions";
import { request_duration } from "../requests_duration";
const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  isAdmin,
  asyncHandler(async (req, res) => {
    const products = await Order.find({}).populate("user");
    res.send(products);
  })
);

router.post("/ddd", (req, res) => {
  console.log("post - ddd");
  res.send("ok");
  res.send("new");
});

router.get(
  "/mine",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const start = process.hrtime();
    console.log("get mine order");
    const products = await Order.find({ user: req.user._id });
    res.status(200).send(products);
    const mongoObject = logging(req, res);
    await mongoObject.save();
    request_duration(start, req, res);
  })
);

router.get(
  "/categories",
  asyncHandler(async (req, res) => {
    console.log("get all categories");
    const categories = await Order.find().distinct("category");
    res.send(categories);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Order.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      throw Error("Order not found.");
    }
  })
);
router.post(
  "/",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const product = new Order({
      orderItems: req.body.cartItems,
      payment: req.body.payment,
      shipping: req.body.shipping,
      itemPrice: req.body.itemPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      taxPrice: req.body.taxPrice,
      user: req.user._id,
    });
    const newOrder = await product.save();
    res.send({ message: "Order Created", data: newOrder });
  })
);
router.put(
  "/:id/pay",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.payment.paymentResult = {
        orderID: req.body.orderID,
        payerID: req.body.payerID,
        paymentID: req.body.paymentID,
      };
      order.isPaid = true;
      order.paidAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: "Order Paid", data: updatedOrder });
    } else {
      throw Error("Order does not exist.");
    }
  })
);
router.put(
  "/:id/deliver",
  isAuthenticated,
  isAdmin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: "Order Delivered", data: updatedOrder });
    } else {
      throw Error("Order does not exist.");
    }
  })
);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  asyncHandler(async (req, res) => {
    const product = await Order.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.countInStock = req.body.countInStock || product.countInStock;
      product.image = req.body.image || product.image;
      product.category = req.body.category || product.category;
      product.brand = req.body.brand || product.brand;
      product.features = req.body.features || product.features;

      const updatedOrder = await product.save();
      res.send({ message: "Order Updated", data: updatedOrder });
    } else {
      throw Error("Order does not exist.");
    }
  })
);
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  asyncHandler(async (req, res) => {
    const product = await Order.findById(req.params.id);
    if (product) {
      const removeOrder = await product.remove();
      res.send({ message: "Order Deleted", data: removeOrder });
    } else {
      throw Error("Order already removed.");
    }
  })
);

export default router;
