const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('Order created');
});

router.get('/', (req, res) => {
  res.send('List of orders');
});

router.get('/:id', (req, res) => {
  res.send(`Order details for ID: ${req.params.id}`);
});

router.patch('/:id', (req, res) => {
  res.send(`Order updated for ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
  res.send(`Order deleted for ID: ${req.params.id}`);
});

module.exports = router;
