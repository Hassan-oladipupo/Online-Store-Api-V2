const deliveryFeeService = require('../Service/deliveryFeeService');
const constants = require('../constants');

module.exports.addDeliveryFee  = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const serviceData = req.body;
    const serviceResponse = await deliveryFeeService.addDeliveryFee (serviceData);
    response.status = 201;
    response.message = constants.deliveryFeeMessage.DELIVERY_FEE_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: addDeliveryFee', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.retrieveAllDeliveryFees = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const { skip, limit } = req.query;
    const serviceResponse = await deliveryFeeService.retrieveAllDeliveryFee({ skip, limit });
    if(serviceResponse.length ===0)
        {
          response.status = 200;
          response.message = constants.deliveryFeeMessage.Delivery_FEE_NOT_FOUND;
        }
      else{
        response.status = 200;
      response.message = constants.deliveryFeeMessage.DELIVERY_FEE_FETCHED;
        response.body = serviceResponse;
      }
  } catch (error) {
    console.log('Something went wrong: Controller: retrieveAllDeliveryFees', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};


module.exports.retrieveDeliveryFeeById = async (req, res) => {
    let response = {...constants.customServerResponse }; 
    try {
      const serviceResponse = await deliveryFeeService.retrieveDeliveryFeeById(req.params);
      response.status = 200;
      response.message = constants.deliveryFeeMessage.DELIVERY_FEE_FETCHED;
      response.body = serviceResponse;
    } catch (error) {
      console.log('Something went wrong: Controller: retrieveDeliveryFeeById', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }

module.exports.getDeliveryFee = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const { productId, state, location,quantity } = req.query;
    const serviceResponse = await deliveryFeeService.getDeliveryFee({ productId, state, location,quantity });
    if(serviceResponse.length ===0)
        {
          response.status = 200;
          response.message = constants.deliveryFeeMessage.Delivery_FEE_NOT_FOUND;
        }
      else{
        response.status = 200;
      response.message = constants.deliveryFeeMessage.DELIVERY_FEE_FETCHED;
        response.body = serviceResponse;
      }
  } catch (error) {
    console.log('Something went wrong: Controller: getDeliveryFee', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};


module.exports.getDeliveryFee = async (req, res) => {
    let response = { ...constants.customServerResponse };
    try {
      const { productId, state, location, quantity } = req.query;
  
      const quantityNumber = parseInt(quantity, 10);
  
      if (isNaN(quantityNumber) || quantityNumber <= 0) {
        response.status = 400;
        response.message = 'Invalid quantity';
        return res.status(response.status).send(response);
      }
  
      const serviceResponse = await deliveryFeeService.getDeliveryFee({ productId, state, location, quantity: quantityNumber });
  
      response.status = 200;
      response.message = 'Success';
      response.body = serviceResponse;
    } catch (error) {
      console.log('Something went wrong: Controller: getDeliveryFee', error);
      response.status = 500;
      response.message = 'Internal Server Error';
    }
    return res.status(response.status).send(response);
  };
  



module.exports.updateExitingDeliveryFee = async (req, res) => {
    let response = {...constants.customServerResponse }; 
    try {
      const serviceResponse = await deliveryFeeService.updateExitingDeliveryFee({
        id: req.params.id,
        updateInfo: req.body
      });
        response.status = 200;
       response.message = constants.deliveryFeeMessage.DELIVERY_FEE_UPDATED;
        response.body = serviceResponse;
      
    } catch (error) {
      console.log('Something went wrong: Controller: updateExitingDeliveryFee', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }


  module.exports.removeDeliveryFee = async (req, res) => {
    let response = {...constants.customServerResponse }; 
    try {
      const serviceResponse = await deliveryFeeService.removeDeliveryFee(req.params);
      response.status = 200;
      response.message = constants.deliveryFeeMessage.DELIVERY_FEE_REMOVED;
      response.body = serviceResponse;
    } catch (error) {
      console.log('Something went wrong: Controller: removeDeliveryFee', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }