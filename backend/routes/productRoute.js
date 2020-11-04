import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";
import { isAuthenticated, isAdmin } from "../util";

import { logging } from "../logging_functions.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const category = req.query.category ? { category: req.query.category } : {};
    const search = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};
    const order = req.query.sort
      ? req.query.sort === "lowest"
        ? { price: 1 }
        : { price: -1 }
      : { _id: -1 };
    const products = await Product.find({ ...category, ...search }).sort(order);
    res.send(products);
  })
);

router.get(
  "/categories",
  asyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      // fix send message
      res.status(200);
      const mongoObject = logging(req, res);
      await mongoObject.save();
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found." });
      const mongoObject = logging(req, res);
      await mongoObject.save();
      throw Error("Product not found.");
    }
  })
);
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  asyncHandler(async (req, res) => {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      countInStock: req.body.countInStock,
      image: req.body.image,
      category: req.body.category,
      brand: req.body.brand,
      features: req.body.features,
    });
    const newProduct = await product.save();
    if (newProduct) {
      res.status(201).send({ message: "Product Created", data: newProduct });
      const mongoObject = logging(req, res);
      await mongoObject.save();
    } else {
      res.status(401).send({ message: "Unathorized" });
      const mongoObject = logging(req, res);
      await mongoObject.save();
    }
  })
);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.countInStock = req.body.countInStock || product.countInStock;
      product.image = req.body.image || product.image;
      product.category = req.body.category || product.category;
      product.brand = req.body.brand || product.brand;
      product.features = req.body.features || product.features;

      const updatedProduct = await product.save();
      res
        .status(204)
        .send({ message: "Product Updated", data: updatedProduct });
      const mongoObject = logging(req, res);
      await mongoObject.save();
    } else {
      throw Error("Product does not exist.");
    }
  })
);
router.post(
  "/:id/reviews",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const review = {
        rating: req.body.rating,
        comment: req.body.comment,
        user: req.user._id,
        name: req.user.name,
      };
      product.reviews.push(review);
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      product.numReviews = product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Comment Created.",
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
      const mongoObject = logging(req, res);
      await mongoObject.save();
    } else {
      res.status(403).send({
        message: "Comment Didnt Created.",
      });
      const mongoObject = logging(req, res);
      await mongoObject.save();
      throw Error("Product does not exist.");
    }
  })
);
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const removeProduct = await product.remove();
      res.send({ message: "Product Deleted", data: removeProduct });
    } else {
      throw Error("Product already removed.");
    }
  })
);

export default router;
