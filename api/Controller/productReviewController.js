const productReviewService = require('../Service/productReviewService');
const constants = require('../constants');

module.exports.addProductReview = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const serviceData = req.body;
    const serviceResponse = await productReviewService.addProductReview(serviceData);
    response.status = 201;
    response.message = constants.reviewMessage.REVIEW_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: addProductReview', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.retrieveProductsReview = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const serviceResponse = await productReviewService.retrieveProductsReview();
    if(serviceResponse.length ===0)
      {
        response.status = 200;
        response.message = constants.reviewMessage.REVIEW_NOT_FOUND;
      }
  
    else{
      response.status = 200;
    response.message = constants.reviewMessage.REVIEW_FETCHED;
      response.body = serviceResponse;
    }
  
  } catch (error) {
    console.log('Something went wrong: Controller: retrieveProductsReview', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.retrieveProductReviewById = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const { id } = req.params;
    const serviceResponse = await productReviewService.retrieveProductReviewById({ id });
    
      response.status = 200;
      response.message = constants.reviewMessage.REVIEW_FETCHED;
      response.body = serviceResponse;
    
  } catch (error) {
    console.log('Something went wrong: Controller: retrieveProductReviewById', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateExistingProductReview = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const userId = req.user.id; 
    const serviceResponse = await productReviewService.updateExistingProductReview({
      id: req.params.id,
      updateInfo: req.body,
      userId: userId
    });
      response.status = 200;
      response.message = constants.reviewMessage.REVIEW_UPDATED;
      response.body = serviceResponse;
    
  } catch (error) {
    console.log('Something went wrong: Controller: updateExistingProductReview', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.removeProductReview = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const userId = req.user.id; 
    const serviceResponse = await productReviewService.removeProductReview({
      id: req.params.id,
      userId: userId
    });
      response.status = 200;
      response.message = constants.reviewMessage.REVIEW_REMOVED;
      response.body = serviceResponse;
    
  } catch (error) {
    console.log('Something went wrong: Controller: removeProductReview', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};


module.exports.retrieveProductReviewsByUserId = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const userId = req.user.id; 
    const serviceResponse = await productReviewService.retrieveProductReviewsByUserId({ userId });
    if(serviceResponse.length ===0)
      {
        response.status = 200;
        response.message = constants.reviewMessage.REVIEW_NOT_FOUND;
      }
    else{
      response.status = 200;
    response.message = constants.reviewMessage.REVIEW_FETCHED;
      response.body = serviceResponse;
    }
  } catch (error) {
    console.log('Something went wrong: Controller: retrieveProductReviewsByUserId', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
