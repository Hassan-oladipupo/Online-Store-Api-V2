const ProductReview = require('../models/productReviewModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const User = require('../models/userModel');
const constants = require('../constants');

module.exports.addProductReview = async (serviceData) => {
  try {
    const user = await User.findById(serviceData.userId);
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    const reviewData = {
      ...serviceData,
      reviewer: `${user.firstName} ${user.lastName}`,
      reviewerEmail: user.email
    };

    let review = new ProductReview(reviewData);
    const result = await review.save();
    return mongoDbDataFormat.formatMongoData(result);
  } catch (error) {
    console.log('Something went wrong: Service: addProductReview', error);
    throw new Error(error);
  }
};

module.exports.retrieveProductsReview = async () => {
  try {
    const review = await ProductReview.find().populate({
      path: 'productId',
      select: 'productName price imageUrl'
    });
    if (!review || review.length === 0) {
      return [];
    }
    return mongoDbDataFormat.formatMongoData(review);
  } catch (error) {
    console.log('Something went wrong: Service: retrieveProductsReview', error);
    throw new Error(error);
  }
};

module.exports.retrieveProductReviewById = async ({ id }) => {
  try {
    mongoDbDataFormat.checkObjectId(id);
    const review = await ProductReview.findById(id).populate({
      path: 'productId',
      select: 'productName price imageUrl'
    });
    if (!review) {
      throw new Error(constants.reviewMessage.REVIEW_NOT_FOUND);
    }

    return mongoDbDataFormat.formatMongoData(review);
  } catch (error) {
    console.log('Something went wrong: Service: retrieveProductReviewById', error);
    throw new Error(error);
  }
};


module.exports.updateExistingProductReview = async ({ id, updateInfo, userId }) => {
  try {
    mongoDbDataFormat.checkObjectId(id);
    const review = await ProductReview.findById(id);

    if (!review) {
      throw new Error(constants.reviewMessage.REVIEW_NOT_FOUND);
    }
    
    if (review.userId.toString() !== userId) {
      throw new Error(constants.reviewMessage.REVIEW_UNAUTHORIZED);
    }
    

    const updatedReview = await ProductReview.findOneAndUpdate(
      { _id: id },
      updateInfo,
      { new: true }
    ).populate({
      path: 'productId',
      select: 'productName price imageUrl'
    });

    return mongoDbDataFormat.formatMongoData(updatedReview);
  } catch (error) {
    console.log('Something went wrong: Service: updateExistingProductReview', error);
    throw new Error(error);
  }
};

module.exports.removeProductReview = async ({ id, userId }) => {
  try {
    mongoDbDataFormat.checkObjectId(id);
    const review = await ProductReview.findByIdAndDelete(id);

    if (!review) {
      throw new Error(constants.reviewMessage.REVIEW_NOT_FOUND);
    }

    if (review.userId.toString() !== userId) {
      throw new Error(constants.reviewMessage.REVIEW_UNAUTHORIZED);
    }

   


    return mongoDbDataFormat.formatMongoData(review);
  } catch (error) {
    console.log('Something went wrong: Service: removeProductReview', error);
    throw new Error(error);
  }
};

module.exports.retrieveProductReviewsByUserId = async ({ userId }) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    const review = await ProductReview.find({ userId }).populate({
      path: 'productId',
      select: 'productName price imageUrl'
    });
    if (!review || review.length === 0) {
      return [];
    }
    return mongoDbDataFormat.formatMongoData(review);
  } catch (error) {
    console.log('Something went wrong: Service: retrieveProductReviewsByUserId', error);
    throw new Error(error);
  }
};
