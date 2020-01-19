import mongoose, { Schema } from 'mongoose';

const orderItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});
const addressSchema = {
  address: String, city: String, postalCode: String, country: String,
};
const paymentSchema = {
  method: { type: String, enum: ['paypal', 'creditcard'], required: true }, cardNumber: String, expireDate: String, cvv: String,
};
const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  orderItems: [orderItemSchema],
  payment: paymentSchema,
  shippingAddress: addressSchema,
  itemPrice: { type: Number, required: true, min: 0 },
  shippingPrice: { type: Number, required: true, min: 0 },
  taxPrice: { type: Number, required: true, min: 0 },
  totalPrice: { type: Number, required: true, min: 0 },
  isPayed: { type: Boolean, required: true, default: false },
  isDelivered: { type: Boolean, required: true, default: false },

}, { timestamps: true });

const Order = mongoose.model('Product', orderSchema);

export default Order;
