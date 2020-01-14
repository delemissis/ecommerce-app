import mongoose from 'mongoose';

const Category = mongoose.model('Category', {
  name: { type: String, required: true },
});

export default Category;
