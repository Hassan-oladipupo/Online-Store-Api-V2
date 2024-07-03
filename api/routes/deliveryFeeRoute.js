const express = require("express");
const router = express.Router();
const deliveryFeeController = require('../Controller/deliveryFeeController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const deliveryFeeSchema = require('../apiSchema/deliveryFeeSchema');
const accessControlValidation = require('../middleware/accessControlValidation');

router.post('/',
    accessControlValidation.validateToken,
    accessControlValidation.isAdmin,
    joiSchemaValidation.validateBody(deliveryFeeSchema.addDeliveryFeeSchema),
    deliveryFeeController.addDeliveryFee
  );


router.get('/',
  accessControlValidation.validateToken,
  accessControlValidation.isAdmin,
  joiSchemaValidation.validateQueryParams(deliveryFeeSchema.retrieveAllDeliveryFeeSchema), 
  deliveryFeeController.retrieveAllDeliveryFees
);

router.get('/cost', 
  accessControlValidation.validateToken,
   deliveryFeeController.getDeliveryFee);


router.get('/:id',
  accessControlValidation.validateToken,
  accessControlValidation.isAdmin,
  deliveryFeeController.retrieveDeliveryFeeById
  );

  router.put('/:id',
    accessControlValidation.validateToken,
    accessControlValidation.isAdmin,
    joiSchemaValidation.validateBody(deliveryFeeSchema.updateDeliveryFeeSchema),
    deliveryFeeController.updateExitingDeliveryFee
  );

  router.delete('/:id',
    accessControlValidation.validateToken,
    accessControlValidation.isAdmin,
    deliveryFeeController.removeDeliveryFee
  );
  
module.exports = router;    