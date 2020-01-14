import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  countInStock: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  rating: {
    type: Number, required: true, default: 0, min: 0, max: 5,
  },
  numReviews: { type: Number, required: true, default: 0 },
  features: { type: [String] },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
