const cartService = require('../Service/cartService');
const constants = require('../constants');

 module.exports.addToCart = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const serviceResponse = await cartService.addToCart({
      user: req.user.id, 
      items: req.body.items 
    });
    response.status = 201;
    response.message = constants.CartMessage.CART_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: addToCart', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};






module.exports.retrieveUserCart = async (req, res) => {
  let response = { ...constants.customServerResponse }; 
  try {
    const userId = req.user.id;
  
    const serviceResponse = await cartService.retrieveUserCart(userId); 
    if(serviceResponse.length ===0)
      {
        response.status = 200;
        response.message = constants.CartMessage.EMPTY_CART;
      }
  
    else{
      response.status = 200;
    response.message = constants.CartMessage.CART_FETCHED;
      response.body = serviceResponse;
    }
   
  } catch (error) {
    console.log('Something went wrong: Controller: retrieveUserCart', error);
    response.message = error.message; 
  }
  return res.status(response.status).json(response);
};


module.exports. updateUserCart = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const responseFromService = await cartService.updateUserCart({
      id: req.params.id,
      updateInfo: req.body
    });
    response.status = 200;
    response.message = constants.CartMessage.CART_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: updateUserCart', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};



module.exports. removeUserCart = async (req, res) => {
  let response = { ...constants.customServerResponse }; 
  try {
    const serviceResponse = await cartService.removeUserCart(req.params.id);
    response.status = 200;
    response.message = constants.CartMessage.CART_REMOVED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: removeUserCart', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};