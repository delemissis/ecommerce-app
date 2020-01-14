import express from 'express';
import Category from '../models/categoryModel';

const router = express.Router();

router.get('/', (req, res) => {
  Category.find({}, (err, categories) => {
    res.send(categories);
  });
});
router.post('/', (req, res) => {
  const category = new Category({ name: req.body.name });
  category.save().then(() => res.send('Category Created.'));
});


export default router;
