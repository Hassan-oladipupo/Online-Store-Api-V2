const express = require("express");
const router = express.Router();
const productController = require('../Controller/productController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');
const uploadsImageValidation = require('../middleware/uploadsImageValidation');
const accessControlValidation = require('../middleware/accessControlValidation');

router.post('/',
    accessControlValidation.validateToken,
    accessControlValidation.isAdmin,
    uploadsImageValidation.single('imageUrl'), 
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
    accessControlValidation.validateToken,
    accessControlValidation.isAdmin,
    joiSchemaValidation.validateBody(productSchema.updateExitingProductSchema),
    productController.updateExitingProduct
  );

  router.delete('/:id',
    accessControlValidation.validateToken,
    accessControlValidation.isAdmin,
    productController.removeProduct
  )

  
module.exports = router;    