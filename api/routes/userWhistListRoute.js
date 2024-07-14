const express = require("express");
const router = express.Router();
const userWishListController = require('../Controller/userWishListController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const userWishListSchema = require('../apiSchema/userWishListSchema');
const accessControlValidation = require('../middleware/accessControlValidation');

router.post('/',
    accessControlValidation.validateToken,
    joiSchemaValidation.validateBody(userWishListSchema.createUserWishListSchema),
    userWishListController.addItemToWishList
);

router.get('/',
    accessControlValidation.validateToken,
    userWishListController.retrieveUserWishList
);

router.delete('/:productId',
    accessControlValidation.validateToken,
    userWishListController.removeItemFromWishList
);

module.exports = router;
