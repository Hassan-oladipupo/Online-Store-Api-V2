const Profile = require('../models/userProfileModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const constants = require('../constants');

module.exports.addUserProfile = async (serviceData) => {
  try {
    const profile = new Profile({ ...serviceData });
    const result = await profile.save();
    return mongoDbDataFormat.formatMongoData(result);
  } catch (error) {
    console.log('Something went wrong: Service: addUserProfile', error);
    throw new Error(error);
  }
};

module.exports.retrieveUserProfile = async (userId) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    const userProfile = await Profile.findOne({ user: userId });

    if (!userProfile) {
      return  [];
    }

    return mongoDbDataFormat.formatMongoData(userProfile);
  } catch (error) {
    console.log('Something went wrong: Service: retrieveUserProfile', error);
    throw new Error(error.message);
  }
};

module.exports.updateUserProfile = async (userId, updateData) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      updateData,
      { new: true }
    );

    if (!updatedProfile) {
      throw new Error(constants.userProfileMessage.USERPROFILE_NOT_FOUND);
    }

    return mongoDbDataFormat.formatMongoData(updatedProfile);
  } catch (error) {
    console.log('Something went wrong: Service: updateUserProfile', error);
    throw new Error(error.message);
  }
};

module.exports.removeUserProfile = async (userId) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    const profileData = await Profile.findOneAndDelete({ user: userId });

    if (!profileData) {
      throw new Error(constants.userProfileMessage.USERPROFILE_NOT_FOUND);
    }

    return mongoDbDataFormat.formatMongoData(profileData);
  } catch (error) {
    console.log('Something went wrong: Service: removeUserProfile', error);
    throw new Error(error.message);
  }
};

module.exports.uploadUserProfileImage = async (userId, imagePath) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { profileImage: imagePath },
      { new: true }
    );

    if (!updatedProfile) {
      throw new Error(constants.userProfileMessage.USERPROFILE_NOT_FOUND);
    }

    return mongoDbDataFormat.formatMongoData(updatedProfile);
  } catch (error) {
    console.log('Something went wrong: Service: uploadUserProfileImage', error);
    throw new Error(error.message);
  }
};
