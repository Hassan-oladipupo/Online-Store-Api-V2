const userWishListService = require('../Service/userWishListService');
const constants = require('../constants');

module.exports.addItemToWishList  = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const serviceResponse = await userWishListService.addItemToWishList({
      userId: req.user.id,  
      productId: req.body.productId  
    });
    response.status = 201;
    response.message = constants.userWhishListMessage.USER_WISHLIST_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: addItemToWishList ', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};




module.exports.retrieveUserWishList = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const userId = req.user.id;

     

    const serviceResponse = await userWishListService.retrieveUserWishList(userId);
    if (serviceResponse.length === 0) {
      response.status = 200;
      response.message = constants.userWhishListMessage.EMPTY_USER_WISHLIST;
    } else {
      response.status = 200;
      response.message = constants.userWhishListMessage.USER_WISHLIST_FETCHED;
      response.body = serviceResponse;
    }
  } catch (error) {
    console.log('Something went wrong: Controller: retrieveUserWishList', error);
    response.message = error.message;
  }
  return res.status(response.status).json(response);
};



module.exports.removeItemFromWishList = async (req, res) => {
  const response = { ...constants.customServerResponse };
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const serviceResponse = await userWishListService.removeItemFromWishList(userId, productId);
    response.status = 200;
    response.message = constants.userWhishListMessage.USER_WISHLIST_REMOVED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: removeItemFromWishList', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

