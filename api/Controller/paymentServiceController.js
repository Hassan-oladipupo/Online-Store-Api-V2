const paymentService = require('../Service/paymentService');
const constants = require('../constants');

module.exports.initializeTransaction = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const { email, amount, orderId } = req.body;
    const serviceResponse = await paymentService.initializeTransaction(email, amount, orderId);

    if (serviceResponse.data.success === true) { 
      response.status = 200;
      response.message = constants.paymentServiceMessage.INITIALIZE_SUCCESS;
      response.body = serviceResponse.data; 
    } else {
      response.status = 400;
      response.message = constants.paymentServiceMessage.INITIALIZED_FAILED;
      response.body = serviceResponse.data; 
    }
  } catch (error) {
    console.log('Something went wrong: Controller: initializeTransaction', error);
    response.status = 500;
    response.message = error.message;
  }
  return res.status(response.status).send(response); 
};



module.exports.verifyPayment = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const { reference } = req.params; 
    const serviceResponse = await paymentService.verifyPayment(reference);

    if (serviceResponse.data.success) {
      response.status = 200;
      response.message = constants.paymentServiceMessage.VERIFY_SUCCESS;
      response.body = serviceResponse.data;
    } else {
      response.status = 400;
      response.message = constants.paymentServiceMessage.VERIFY_FAILED;
      response.body = serviceResponse.data;
    }
  } catch (error) {
    console.log('Something went wrong: Controller: verifyPayment', error);
    response.status = 500;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
