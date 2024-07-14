const userWishList = require('../models/userWishListModel');
const Product = require('../models/productModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const constants = require('../constants');

module.exports.addItemToWishList = async (serviceData) => {
  try {
    const product = await Product.findById(serviceData.productId);
    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }

    const existingWishlistItem = await userWishList.findOne({
      userId: serviceData.userId,
      productId: serviceData.productId,
    });
    if (existingWishlistItem) {
      throw new Error(constants.userWhishListMessage.USER_WISHLIST_EXIST);
    }
    const saveItemData = {
      ...serviceData,
      productName: product.productName,
     productPrice: product.price
    };

    const saveItem = new userWishList(saveItemData);
    const result = await saveItem.save();
    return mongoDbDataFormat.formatMongoData(result);

  } catch (error) {
    console.log('Something went wrong: Service: saveItem', error);
    throw new Error(error.message);
  }
};




module.exports.retrieveUserWishList = async (userId) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);

    let savedItems = await userWishList.find({ userId })

    if (!savedItems || savedItems.length === 0) {
      return [];
    }

    let formattedItems = mongoDbDataFormat.formatMongoData(savedItems);

    return formattedItems;
  } catch (error) {
    console.log('Something went wrong: Service: retrieveUserWishList', error);
    throw new Error(error.message);
  }
};



module.exports.removeItemFromWishList = async (userId, productId) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    mongoDbDataFormat.checkObjectId(productId);

    const savedItem = await userWishList.findOne({ userId, productId });
  

    if (!savedItem) {
      throw new Error(constants.userWhishListMessage.ITEM_NOT_FOUND);
    }

 

    await userWishList.findByIdAndDelete(savedItem._id);

    return mongoDbDataFormat.formatMongoData(savedItem);
  } catch (error) {
    console.log('Something went wrong: Service: removeItemFromWishList', error);
    throw new Error(error.message);
  }
};