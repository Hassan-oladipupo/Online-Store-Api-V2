const deliveryFee = require('../models/deliveryFeeModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const constants = require('../constants');

module.exports.addDeliveryFee = async (serviceData) => {
  try {
    let deliveryCost = new deliveryFee({ ...serviceData });
    result =  await deliveryCost.save();
    return mongoDbDataFormat.formatMongoData(result);
    
  } catch (error) {
    console.log('Something went wrong: Service: addDeliveryFee', error);
    throw new Error(error);
  }
};



module.exports.retrieveAllDeliveryFee = async ({ skip = 0, limit = 10 }) => {
  try {
    let deliveryCost = await deliveryFee.find({}).skip(parseInt(skip)).limit(parseInt(limit));
    if (!deliveryCost || deliveryCost.length === 0) {
      return [];
    }
    return mongoDbDataFormat.formatMongoData(deliveryCost);
  } catch (error) {
    console.log('Something went wrong: Service: retrieveAllDeliveryFee', error);
    throw new Error(error);
  }
}

module.exports.retrieveDeliveryFeeById = async ({ id }) => {
  try {
    mongoDbDataFormat.checkObjectId(id)
    let deliveryCost = await deliveryFee.findById(id);
    if (!deliveryCost) {
      throw new Error(constants.deliveryFeeMessage.Delivery_FEE_NOT_FOUND);
    }
    return mongoDbDataFormat.formatMongoData(deliveryCost);
  } catch (error) {
    console.log('Something went wrong: Service: retrievePretrieveDeliveryFeeById', error);
    throw new Error(error);
  }
}

module.exports.getDeliveryFee = async ({ productId, state, location,quantity }) => {
  try {
    let deliveryCost = await deliveryFee.findOne({
      productId,
      state,
      location
    });

    if (!deliveryCost || deliveryCost.length === 0) {
      return [];
    }
      const totalDeliveryFee = deliveryCost.deliveryFee * quantity;

    return mongoDbDataFormat.formatMongoData(totalDeliveryFee);
  } catch (error) {
    console.log('Something went wrong: Service: getDeliveryFee', error);
    throw new Error(error);
  }
};


module.exports.updateExitingDeliveryFee = async ({ id, updateInfo }) => {
  try {
    mongoDbDataFormat.checkObjectId(id);
    let deliveryCost = await deliveryFee.findOneAndUpdate(
      { _id: id },
      updateInfo,
      { new: true }
    )
    return mongoDbDataFormat.formatMongoData(deliveryCost);
  } catch (error) {
    console.log('Something went wrong: Service: updateExitingDeliveryFee', error);
    throw new Error(error);
  }
}


module.exports.removeDeliveryFee = async ({ id }) => {
  try {
    mongoDbDataFormat.checkObjectId(id);
    let deliveryCost = await deliveryFee.findByIdAndDelete(id);
    if (!deliveryCost) {
      throw new Error(constants.deliveryFeeMessage.Delivery_FEE_NOT_FOUND);
    }
    return mongoDbDataFormat.formatMongoData(deliveryCost);
  } catch (error) {
    console.log('Something went wrong: Service: removeDeliveryFee', error);
    throw new Error(error);
  }
}


