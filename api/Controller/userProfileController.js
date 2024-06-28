const userProfileService = require('../Service/userProfileService');
const constants = require('../constants');

module.exports.addUserProfile = async (req, res) => {
  let response = { ...constants.customServerResponse };
  try {
    const serviceResponse = await userProfileService.addUserProfile(req.body);
    response.status = 201;
    response.message = constants.userProfileMessage.USERPROFILE_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: addUserProfile', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};



module.exports.retrieveUserProfile = async (req, res) => {
  let response = { ...constants.customServerResponse }; 
  try {
    const userId = req.user.id;
  
    const serviceResponse = await userProfileService.retrieveUserProfile(userId); 
    response.status = 200;
    response.message = constants.userProfileMessage.USERPROFILE_FETCHED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: retrieveUserProfile', error);
    response.message = error.message; 
  }
  return res.status(response.status).json(response);
};

module.exports.updateUserProfile = async (req, res) => {
  let response = {...constants.customServerResponse }; 
  try {
    const responseFromService = await productService.updateUserProfile({
      id: req.params.id,
      updateInfo: req.body
    });
    response.status = 200;
    response.message = constants.userProfileMessage.USERPROFILE_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: updateUserProfile', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}


module.exports.removeUserProfile = async (req, res) => {
  let response = {...constants.customServerResponse }; 
  try {
    const responseFromService = await productService.removeUserProfile({
      id: req.params.id,
    });
    response.status = 200;
    response.message = constants.userProfileMessage.USERPROFILE_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: removeUserProfile', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}