const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const constants = require('../constants');

module.exports.addToCart = async (serviceData) => {
  try {
    const productIds = serviceData.productId;
    const validProducts = await Product.find({ '_id': { $in: productIds } });

    if (validProducts.length !== productIds.length) {
      throw new Error('One or more product IDs are invalid');
    }

    const newCart = new Cart({ ...serviceData });
    const result = await newCart.save();
    return mongoDbDataFormat.formatMongoData(result);
  } catch (error) {
    console.log('Something went wrong: Service: addToCart', error);
    throw new Error(error);
  }
};

module.exports.retrieveUserCart = async (userId) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    let cart = await Cart.find({ userId }).populate('productId', 'productName');
    if (!cart) {
      throw new Error(constants.CartMessage.EMPTY_CART);
    }
    return mongoDbDataFormat.formatMongoData(cart);
  } catch (error) {
    console.log('Something went wrong: Service: retrieveUserCart', error);
    throw new Error(error);
  }
};

module.exports.updateUserCart = async ({ id, productId, quantity }) => {
  try {
    mongoDbDataFormat.checkObjectId(id);
    mongoDbDataFormat.checkObjectId(productId);

    let cart = await Cart.findById(id).populate('productId', 'productName');
    if (!cart) {
      throw new Error(constants.CartMessage.CART_NOT_FOUND);
    }

    const productIndex = cart.productId.findIndex(product => product._id.equals(productId));
    if (productIndex > -1) {
      cart.productId[productIndex].quantity = quantity;
    } else {
      throw new Error('Product not found in cart');
    }

    await cart.save();
    const formattedCart = mongoDbDataFormat.formatMongoData(cart);
    formattedCart.productId = formattedCart.productId.map(product => product.productName);
    return formattedCart;
  } catch (error) {
    console.log('Something went wrong: Service: updateUserCart', error);
    throw new Error(error);
  }
};

module.exports.removeUserCart = async (id) => {
  try {
    mongoDbDataFormat.checkObjectId(id);
    let cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      throw new Error(constants.CartMessage.EMPTY_CART);
    }
    return mongoDbDataFormat.formatMongoData(cart);
  } catch (error) {
    console.log('Something went wrong: Service: removeUserCart', error);
    throw new Error(error);
  }
};
