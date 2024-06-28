const Profile = require('../models/userProfile');
const mongoDbDataFormat = require('../helper/dbHelper');
const constants = require('../constants');
const userProfile = require('../models/userProfile');

module.exports.addUserProfile = async (serviceData) => {
  try {
    let product = new userProfile({ ...serviceData });
    result =  await product.save();
    return mongoDbDataFormat.formatMongoData(result);
    
  } catch (error) {
    console.log('Something went wrong: Service: addUserProfile', error);
    throw new Error(error);
  }
}



module.exports.retrieveUserProfile = async (userId) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    
    let userProfile = await Profile.find({ userId })
      

    if (!userProfile) {
      throw new Error(constants.userProfileMessage.USER_NOT_FOUND);
    }

    let formattedUserProfile = mongoDbDataFormat.formatMongoData(userProfile);
    formattedUserProfile = formattedUserProfile.map(userProfile => {
    
    });

    return formattedUserProfile;
  } catch (error) {
    console.log('Something went wrong: Service: retrieveUserProfile', error);
    throw new Error(error.message);
  }
};




module.exports.updateUserProfile= async (userId, updateData) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    
    const updatedProfile = await  Profile.findOneAndUpdate(
      { userId },
      updateData,
      { new: true }
    );

    if (!updatedProfile) {
      throw new Error('User profile not found.');
    }

    return mongoDbDataFormat.formatMongoData(updatedProfile);
  } catch (error) {
    console.log('Something went wrong: Service: updateUserProfile', error);
    throw new Error(error.message);
  }
};


module.exports.removeUserProfile= async (userId) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    
    const profileData = await  Profile.indByIdAndDelete(
      { userId },
    
    );

    if (!profileData) {
      throw new Error('User profile not found.');
    }

    return mongoDbDataFormat.formatMongoData(profileData);
  } catch (error) {
    console.log('Something went wrong: Service: removeUserProfile', error);
    throw new Error(error.message);
  }
};



