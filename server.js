const express = require('express');
const dotEnv = require('dotenv');
const dbConnection = require('./api/database/connection');
const morgan = require('morgan');
const cors = require('cors');

dotEnv.config();

const app = express();

app.use(cors());
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev'));


app.use('/api/v2/products', require('./api/routes/productRoute'));
app.use('/api/v2/orders', require('./api/routes/orderRoute'));
app.use('/api/v2/users', require('./api/routes/userRoute'));
app.use('/api/v2/carts', require('./api/routes/cartRoute'));
app.use('/api/v2/user-profile', require('./api/routes/userProfileRoute'));


app.get('/', (req, res) => {
  res.send('RestApi For Online Shopping Stores');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message,
    body: {}
  });
});
