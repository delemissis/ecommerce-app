import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import userRoute from './routes/userRoute';
import categoryRoute from './routes/categoryRoute';
import productRoute from './routes/productRoute';

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/amazona';
const port = process.env.PORT || 5000;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err.reason));

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
app.use(bodyParser.json());


app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/users', userRoute);

app.use(express.static(path.join(__dirname, '/../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status);
  res.send({ message: err.message });
});
app.listen(port, () => console.log(`Server serves at http://localhost:${port}`));
