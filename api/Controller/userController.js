const constants = require('../constants');
const userService = require('../Service/userService');


module.exports.register = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const serviceResponse = await userService.register(req.body);
    response.status = 200;
    response.message = constants.userMessage.SIGNUP_SUCCESS;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: signup', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.login = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const serviceResponse = await userService.login(req.body);
    response.status = 200;
    response.message = constants.userMessage.LOGIN_SUCCESS;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: login', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}