const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const constants = require('../constants');

module.exports.addToCart = async (serviceData) => {
  try {
    const userId = serviceData.user; 
    const items = serviceData.items;

    const productIds = items.map(item => item.productId);
    const validProducts = await Product.find({ '_id': { $in: productIds } });

    if (validProducts.length !== productIds.length) {
      throw new Error(constants.productMessage.INVALID_PRODUCT_ID);
    }

    items.forEach(item => {
      const product = validProducts.find(product => product._id.toString() === item.productId);
      if (!product) {
        throw new Error(constants.productMessage.INVALID_PRODUCT_ID);
      }
      if (item.quantity < product.minimumOrderQuantity) {
        throw new Error(constants.productMessage.MOQ_NOT_MET(product.productName, product.minimumOrderQuantity));
      }
    });

    let cart = await Cart.findOne({ userId });

    if (cart) {
      items.forEach(item => {
        const productIndex = cart.items.findIndex(cartItem => cartItem.productId.toString() === item.productId);
        if (productIndex !== -1) {
          cart.items[productIndex].quantity += item.quantity;
        } else {
          cart.items.push(item);
        }
      });
    } else {
      cart = new Cart({ userId, items });
    }

    const result = await cart.save();

    let savedCart = await Cart.findById(result._id).populate({
      path: 'items.productId',
      select: 'productName price'
    });

    let formattedCart = mongoDbDataFormat.formatMongoData(savedCart);

    if (Array.isArray(formattedCart.items)) {
      formattedCart.products = formattedCart.items.map(item => ({
        productId: item.productId._id,
        productName: item.productId.productName,
        quantity: item.quantity,
        totalAmount: item.productId.price * item.quantity
      }));
      formattedCart.totalCartAmount = formattedCart.products.reduce((sum, product) => sum + product.totalAmount, 0);
    } else {
      formattedCart.products = [];
      formattedCart.totalCartAmount = 0;
    }

    delete formattedCart.items;

    return formattedCart;
  } catch (error) {
    console.log('Something went wrong: Service: addToCart', error);
    throw new Error(error.message);
  }
};







module.exports.retrieveUserCart = async (userId) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    
    let carts = await Cart.find({ userId })
      .populate({
        path: 'items.productId',
        select: 'productName price'  
      });

    if (!carts || carts.length === 0) {
      return [];
    }

    let formattedCarts = mongoDbDataFormat.formatMongoData(carts);
    formattedCarts = formattedCarts.map(cart => {
      cart.products = cart.items.map(item => ({
        productId: item.productId._id,
        productName: item.productId.productName,
        quantity: item.quantity,
        totalAmount: item.productId.price * item.quantity
      }));
      cart.totalCartAmount = cart.products.reduce((sum, product) => sum + product.totalAmount, 0);
      delete cart.items; 
      return cart;
    });

    return formattedCarts;
  } catch (error) {
    console.log('Something went wrong: Service: retrieveUserCart', error);
    throw new Error(error.message);
  }
};


module.exports.updateUserCart = async ({ id, updateInfo }) => {
  try {
    mongoDbDataFormat.checkObjectId(id);

    const { productId, quantityChange } = updateInfo;

    if (!productId || quantityChange == null) {
      throw new Error(constants.productMessage.PRODUCT_ITEM_REQUIRE);
    }

    let cart = await Cart.findById(id);
    if (!cart) {
      throw new Error(constants.CartMessage.EMPTY_CART);
    }

    if (!Array.isArray(cart.items)) {
      cart.items = [];
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      cart.items.push({ productId, quantity: quantityChange });
    } else {
      cart.items[itemIndex].quantity += quantityChange;

      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    }

    await cart.save();

    await cart.populate('items.productId', 'productName price');

    const formattedCart = mongoDbDataFormat.formatMongoData(cart);
    formattedCart.products = formattedCart.items.map(item => ({
      productId: item.productId._id,
      productName: item.productId.productName,
      quantity: item.quantity,
      totalAmount: item.productId.price * item.quantity  
    }));
    formattedCart.totalCartAmount = formattedCart.products.reduce((sum, product) => sum + product.totalAmount, 0);
    delete formattedCart.items;

    return formattedCart;

  } catch (error) {
    console.log('Something went wrong: Service: updateUserCart', error);
    throw new Error(error.message);
  }
};



module.exports.removeUserCart = async (id) => {
  try {
    mongoDbDataFormat.checkObjectId(id);
    
    let cart = await Cart.findByIdAndDelete(id).populate({
      path: 'items.productId',
      select: 'productName price'  
    });
    
    if (!cart) {
      throw new Error(constants.CartMessage.EMPTY_CART);
    }
    
    let formattedCart = mongoDbDataFormat.formatMongoData(cart);
    formattedCart.products = formattedCart.items.map(item => ({
      productId: item.productId._id,
      productName: item.productId.productName,
      quantity: item.quantity,
      totalAmount: item.productId.price * item.quantity
    }));
    formattedCart.totalCartAmount = formattedCart.products.reduce((sum, product) => sum + product.totalAmount, 0);
    delete formattedCart.items;
    
    return formattedCart;
  } catch (error) {
    console.log('Something went wrong: Service: removeUserCart', error);
    throw new Error(error.message);
  }
};

