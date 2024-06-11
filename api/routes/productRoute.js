const express = require("express");
const router = express.Router();
const productController = require('../Controller/productController')
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');
const upload = require('../middleware/uploadsImage')


router.post('/', 
joiSchemaValidation.validateBody(productSchema.createProductSchema),
productController.createProduct,
  upload
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