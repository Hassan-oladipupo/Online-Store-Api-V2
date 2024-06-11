const express = require("express");
const router = express.Router();
const productController = require('../Controller/productController')
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');


router.post('/', 
joiSchemaValidation.validateBody(productSchema.createProductSchema),
productController.createProduct
);


router.get('/',
 joiSchemaValidation.validateQueryParams(productSchema.retrieveAllProductSchema), 
productController.retrieveAllProducts
);

router.get('/:id',
    productController.retrieveProductById
  );

  router.put('/:id',
    joiSchemaValidation.validateBody(productSchema.updateExitingProductSchema),
    productController.updateExitingProduct
  );

  router.delete('/:id',
    productController.removeProduct
  )

  
module.exports = router;    