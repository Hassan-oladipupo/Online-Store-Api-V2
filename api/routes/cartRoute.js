const express = require("express");
const router = express.Router();
const cartController = require('../Controller/cartController ');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const cartSchema = require('../apiSchema/cartSchema');
const accessControlValidation = require('../middleware/accessControlValidation');

router.post('/',
  accessControlValidation.validateToken,
  joiSchemaValidation.validateBody(cartSchema.createCartSchema),
  cartController.addToCart
);

router.get('/:user',
  accessControlValidation.validateToken,
  cartController.retrieveUserCart
);

router.put('/:id',
  accessControlValidation.validateToken,
  joiSchemaValidation.validateBody(cartSchema.updateCartSchema),
  cartController.updateUserCart
);

router.delete('/:id',
  accessControlValidation.validateToken,
  cartController.removeUserCart
);

module.exports = router;
