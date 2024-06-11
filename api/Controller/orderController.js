const orderService = require('../Service/orderService');
const constants = require('../constants');

module.exports.createOrder = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
   
    const serviceResponse = await orderService.createOrder(req.body);
    response.status = 201;
    response.message = constants.orderMessage.Order_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: createOrder', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};


module.exports.retrieveAllOrders = async (req, res) =>
  {
    let response = {...constants.customServerResponse }; 
    try {
      const serviceResponse = await orderService.retrieveAllOrders(req.query);
        response.status = 200;
        response.message = constants.orderMessage.Order_FETCHED;
        response.body = serviceResponse;
     
    } catch (error) {
      console.log('Something went wrong: Controller: createOrder', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }

  module.exports.retrieveOrderByUserId = async (req, res) => {
    let response = {...constants.customServerResponse}; 
    try {
        const serviceResponse = await orderService.retrieveOrdersByUserId(req.params.userId); 
        response.status = 200;
        response.message = constants.orderMessage.Order_FETCHED;
        response.body = serviceResponse;
    } catch (error) {
        console.log('Something went wrong: Controller: getOrderByUserId', error);
        response.status = 500; 
        response.message = error.message; 
    }
    return res.status(response.status).json(response);
};


  module.exports.updateExitingOrder = async (req, res) => {
    let response = {...constants.customServerResponse }; 
    try {
      const responseFromService = await orderService.updateExitingOrder({
        id: req.params.id,
        updateInfo: req.body
      });
      response.status = 200;
      response.message = constants.orderMessage.Order_UPDATED;
      response.body = responseFromService;
    } catch (error) {
      console.log('Something went wrong: Controller: updateOrder', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }
  

  module.exports.removeOrder = async (req, res) => {
    let response = {...constants.customServerResponse }; 
    try {
      const serviceResponse = await orderService.removeOrder(req.params);
      response.status = 200;
      response.message = constants.orderMessage.Order_REMOVED;
      response.body = serviceResponse;
    } catch (error) {
      console.log('Something went wrong: Controller: deleteOrder', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }