const express = require("express");
const router = express.Router();
const productReviewController = require('../Controller/productReviewController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const productReviewSchema = require('../apiSchema/productReviewSchema');
const accessControlValidation = require('../middleware/accessControlValidation');

router.post('/',
    accessControlValidation.validateToken,
    joiSchemaValidation.validateBody(productReviewSchema.addProductReviewSchema),
    productReviewController.addProductReview
  );


router.get('/',
 productReviewController.retrieveProductsReview
);

router.get('/user-reviews', 
  accessControlValidation.validateToken,
   productReviewController.retrieveProductReviewsByUserId);


router.get('/:id',
  productReviewController.retrieveProductReviewById
  );

  router.put('/:id',
    accessControlValidation.validateToken,
    joiSchemaValidation.validateBody(productReviewSchema.updateProductReviewSchema),
     productReviewController.updateExistingProductReview
  );

  router.delete('/:id',
    accessControlValidation.validateToken,
    productReviewController.removeProductReview
  );
  
module.exports = router;    