const express = require("express");
const router = express.Router();
const userProfileController = require('../Controller/userProfileController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const userProfileSchema = require('../apiSchema/userProfileSchema');
const uploadsImageValidation = require('../middleware/uploadsImageValidation');
const accessControlValidation = require('../middleware/accessControlValidation');

router.post('/',
    accessControlValidation.validateToken,
    accessControlValidation.isAdmin,
    uploadsImageValidation.single('imageUrl'), 
    joiSchemaValidation.validateBody(productSchema.createProductSchema),
  userProfileController.addUserProfile
  );


  router.get('/user',
    accessControlValidation.validateToken,
    userProfileController.retrieveUserProfile,
    
  );
  



  router.put('/:id',
    accessControlValidation.validateToken,
    accessControlValidation.isAdmin,
    joiSchemaValidation.validateBody(userProfileSchema.updateUserProfileSchema),
  userProfileController.updateUserProfile
  );

  router.delete('/:id',
    accessControlValidation.validateToken,
    accessControlValidation.isAdmin,
  userProfileController.removeUserProfile
  );

  
  
module.exports = router;    