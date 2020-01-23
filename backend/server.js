import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

dotenv.config();

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
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
console.log(process.env.NODE_ENV);
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.use('/uploads', express.static(path.join(__dirname, process.env.NODE_ENV === 'production' ? '/../uploads' : '/uploads')));

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status);
  res.send({ message: err.message });
});

// default options
app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const { image } = req.files;

  // Use the mv() method to place the file somewhere on your server
  const filename = `${new Date().getTime()}.jpg`;
  image.mv(`${__dirname}/uploads/${filename}`, (err) => {
    if (err) return res.status(500).send(err);

    res.send(`/uploads/${filename}`);
  });
});

app.listen(port, () => console.log(`Server serves at http://localhost:${port}`));
