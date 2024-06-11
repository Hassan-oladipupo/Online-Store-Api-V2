const express = require("express");
const router = express.Router();
const orderController = require('../Controller/orderController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const orderSchema = require('../apiSchema/orderSchema');
const accessControlValidation = require('../middleware/accessControlValidation');

router.post('/',
    accessControlValidation.validateToken,
    joiSchemaValidation.validateBody(orderSchema.createOrderSchema),
    orderController.createOrder
);

router.get('/');

router.get('/:id',
  accessControlValidation.validateToken,
  orderController.retrieveOrderByUserId
);

router.put('/:id',
  accessControlValidation.validateToken,
  accessControlValidation.isAdmin,
  joiSchemaValidation.validateBody(orderSchema.updateOrderSchema),
  orderController.updateExitingOrder
);

router.delete('/:id',);

module.exports = router;
