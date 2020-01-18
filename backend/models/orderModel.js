import mongoose, { Schema } from 'mongoose';

const orderItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

const orderSchema = new Schema({
  isPayed: { type: String, enum: ['Unpaied', ''], required: true },
  paymentMethod: { type: String, enum: ['paypal', 'creditCard'], required: true },
  itemPrice: { type: Number, required: true, min: 0 },
  shippingPrice: { type: Number, required: true, min: 0 },
  taxPrice: { type: Number, required: true, min: 0 },
  totalPrice: { type: Number, required: true, min: 0 },
  orderItems: { type: [orderItemSchema] },
}, { timestamps: true });

const Order = mongoose.model('Product', orderSchema);

export default Order;
