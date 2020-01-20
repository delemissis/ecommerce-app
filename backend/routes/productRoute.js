import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';
import { isAuthenticated, isAdmin } from '../util';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const filter = req.query.category ? { category: req.query.category } : {};
  const products = await Product.find(filter);
  res.send(products);
}));

router.get('/categories', asyncHandler(async (req, res) => {
  const categories = await Product.find().distinct('category');
  res.send(categories);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    throw Error('Product not found.');
  }
}));
router.post('/', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    countInStock: req.body.countInStock,
    image: req.body.image,
    category: req.body.category,
    brand: req.body.brand,
    features: req.body.features,
  });
  const newProduct = await product.save();
  res.send({ message: 'Product Created', data: newProduct });
}));
router.put('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.features = req.body.features || product.features;

    const updatedProduct = await product.save();
    res.send({ message: 'Product Updated', data: updatedProduct });
  } else {
    throw Error('Product does not exist.');
  }
}));
router.delete('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const removeProduct = await product.remove();
    res.send({ message: 'Product Deleted', data: removeProduct });
  } else {
    throw Error('Product already removed.');
  }
}));

export default router;
