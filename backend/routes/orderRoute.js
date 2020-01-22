import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import { isAuthenticated, isAdmin } from '../util';

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const products = await Order.find({ });
  res.send(products);
}));

router.get('/mine', isAuthenticated, asyncHandler(async (req, res) => {
  const products = await Order.find({ user: req.user._id });
  res.send(products);
}));

router.get('/categories', asyncHandler(async (req, res) => {
  const categories = await Order.find().distinct('category');
  res.send(categories);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Order.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    throw Error('Order not found.');
  }
}));
router.post('/', isAuthenticated, asyncHandler(async (req, res) => {
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
  res.send({ message: 'Order Created', data: newOrder });
}));
router.put('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
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
    res.send({ message: 'Order Updated', data: updatedOrder });
  } else {
    throw Error('Order does not exist.');
  }
}));
router.delete('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const product = await Order.findById(req.params.id);
  if (product) {
    const removeOrder = await product.remove();
    res.send({ message: 'Order Deleted', data: removeOrder });
  } else {
    throw Error('Order already removed.');
  }
}));

export default router;
