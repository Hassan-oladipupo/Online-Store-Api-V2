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


// Routes
app.use('/api/v2/products', require('./api/routes/productRoute'));
app.use('/api/v2/orders', require('./api/routes/orderRoute'));

app.get('/', (req, res) => {
  res.send('RestApi For Online Shopping Stores');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// 404 Middleware - Catch all unmatched routes
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
