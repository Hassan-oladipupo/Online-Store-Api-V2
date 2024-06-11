const mongoose = require('mongoose');
const constants = require('../constants');

module.exports.formatMongoData = (data) => {
  if (Array.isArray(data)) {
   let newDataList = [];
      for (value of data) {
        newDataList.push(value.toObject());
      }
      return newDataList;
}
return data.toObject();
}

module.exports.checkObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(constants.databaseMessage.INVALID_ID);
  }
}


module.exports.isStrongPassword = (password) => {

  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /\d/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasDigits
  );
};