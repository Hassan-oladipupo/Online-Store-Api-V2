const userProfileService = require('../Service/userProfileService');
const constants = require('../constants');
const upload = require('../middleware/uploadsImageValidation');

module.exports.addUserProfile = async (req, res) => {
  const response = { ...constants.customServerResponse };
  try {
    const serviceResponse = await userProfileService.addUserProfile({
      user: req.user.id, 
      ...req.body
    });
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
  const response = { ...constants.customServerResponse };
  try {
    const userId = req.user.id;
    const serviceResponse = await userProfileService.retrieveUserProfile(userId);

    if (serviceResponse.length === 0) {
      response.status = 200; 
      response.message = constants.userProfileMessage.USERPROFILE_NOT_FOUND;
      
    } else {
      response.status = 200; 
      response.message = constants.userProfileMessage.USERPROFILE_FETCHED;
      response.body = serviceResponse;
    }
  } catch (error) {
    console.log('Something went wrong: Controller: retrieveUserProfile', error);
    response.message = error.message;
  }
  return res.status(response.status).json(response);
};

module.exports.updateUserProfile = async (req, res) => {
  const response = { ...constants.customServerResponse };
  try {
    const userId = req.user.id;
    const serviceResponse = await userProfileService.updateUserProfile(userId, req.body);
    response.status = 200;
    response.message = constants.userProfileMessage.USERPROFILE_UPDATED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: updateUserProfile', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.removeUserProfile = async (req, res) => {
  const response = { ...constants.customServerResponse };
  try {
    const userId = req.user.id;
    const serviceResponse = await userProfileService.removeUserProfile(userId);
    response.status = 200;
    response.message = constants.userProfileMessage.USERPROFILE_DELETED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: removeUserProfile', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.uploadUserProfileImage = (req, res) => {
  const response = { ...constants.customServerResponse };
  upload.single('profileImage')(req, res, async (error) => {
    if (error) {
      console.log('Something went wrong: Controller: uploadUserProfileImage', error);
      response.message = error.message;
      return res.status(400).json(response);
    }

    try {
      const userId = req.user.id;
      const imagePath = req.file.path;
      const serviceResponse = await userProfileService.uploadUserProfileImage(userId, imagePath);
      response.status = 200;
      response.message = constants.userProfileMessage.PROFILE_IMAGE_UPLOAD;
      response.body = serviceResponse;
    } catch (error) {
      console.log('Something went wrong: Controller: uploadUserProfileImage', error);
      response.message = error.message;
    }
    return res.status(response.status).json(response);
  });
};
