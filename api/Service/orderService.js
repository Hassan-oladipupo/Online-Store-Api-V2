const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const constants = require('../constants');




module.exports.createOrder = async (serviceData) => {
  try {
    const productIds = serviceData.items.map(item => item.productId);
    const validProducts = await Product.find({ '_id': { $in: productIds } });

    if (validProducts.length !== productIds.length) {
      throw new Error('One or more product IDs are invalid');
    }

    if (!serviceData.orderStatus) {
      serviceData.orderStatus = 'pending';
    }

    let totalAmount = 0;
    serviceData.products = serviceData.items.map(item => {
      const productData = validProducts.find(p => p._id.toString() === item.productId);
      if (!productData) {
        throw new Error(constants.productMessage.PRODUCT_ID_NOT_FOUND(item.productId));
      }
      const productTotal = productData.price * item.quantity;
      totalAmount += productTotal;
      return {
        productId: productData._id,
        quantity: item.quantity,
        totalPrice: productTotal
      };
    });

    serviceData.totalAmount = totalAmount;

    const newOrder = new Order({ ...serviceData });
    const result = await newOrder.save();

    let savedOrder = await Order.findById(result._id).populate({
      path: 'products.productId',
      select: 'productName price'
    });

    if (!savedOrder) {
      throw new Error('Failed to retrieve saved order');
    }

    let formattedOrder = mongoDbDataFormat.formatMongoData(savedOrder);
    formattedOrder.products = formattedOrder.products.map(product => ({
      productId: product.productId._id,
      productName: product.productId.productName,
      quantity: product.quantity,
      totalPrice: product.totalPrice
    }));
    formattedOrder.totalAmount = totalAmount;

    return formattedOrder;
  } catch (error) {
    console.log('Something went wrong: Service: createOrder', error);
    throw new Error(error.message);
  }
};



module.exports.retrieveAllOrders = async ({ skip = 0, limit = 10 }) => {
  try {
    let orders = await Order.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({
        path: 'products.productId',
        select: 'productName price'
      });

    let formattedOrders = orders.map(order => {
      let totalAmount = 0;
      order.products = order.products.map(product => {
        const totalPrice = product.productId.price * product.quantity;
        totalAmount += totalPrice;
        return {
          productId: product.productId._id,
          productName: product.productId.productName,
          quantity: product.quantity,
          totalPrice
        };
      });
      order.totalAmount = totalAmount;
      return order.toObject();
    });

    return formattedOrders;
  } catch (error) {
    console.log('Something went wrong: Service: retrieveAllOrders', error);
    throw new Error(error.message);
  }
};


module.exports.retrieveOrdersByUserId = async (userId, { skip = 0, limit = 10 }) => {
  try {
    mongoDbDataFormat.checkObjectId(userId);
    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 10;

    let orders = await Order.find({ userId })
      .populate({
        path: 'products.productId',
        select: 'productName price'
      })
      .skip(skip)
      .limit(limit);

    let formattedOrders = orders.map(order => {
      let totalAmount = 0;
      order.products = order.products.map(product => {
        const totalPrice = product.productId.price * product.quantity;
        totalAmount += totalPrice;
        return {
          productId: product.productId._id,
          productName: product.productId.productName,
          quantity: product.quantity,
          totalPrice
        };
      });
      order.totalAmount = totalAmount;
      return order.toObject();
    });

    return formattedOrders;
  } catch (error) {
    console.log('Something went wrong: Service: retrieveOrdersByUserId', error);
    throw new Error(error.message);
  }
};

module.exports.updateExistingOrder = async ({ id, updateInfo }) => {
  try {
    mongoDbDataFormat.checkObjectId(id);
    let order = await Order.findOneAndUpdate(
      { _id: id },
      updateInfo,
      { new: true }
    ).populate('products.productId', 'productName price');

    if (!order) {
      throw new Error(constants.orderMessage.ORDER_NOT_FOUND);
    }

    let totalAmount = 0;
    order.products = order.products.map(product => {
      const totalPrice = product.productId.price * product.quantity;
      totalAmount += totalPrice;
      return {
        productId: product.productId._id,
        productName: product.productId.productName,
        quantity: product.quantity,
        totalPrice
      };
    });
    order.totalAmount = totalAmount;

    return order.toObject();
  } catch (error) {
    console.log('Something went wrong: Service: updateOrder', error);
    throw new Error(error.message);
  }
};

module.exports.removeOrder = async ({ id }) => {
  try {
    mongoDbDataFormat.checkObjectId(id);
    let order = await Order.findByIdAndDelete(id).populate({
      path: 'products.productId',
      select: 'productName price'
    });

    if (!order) {
      throw new Error(constants.orderMessage.ORDER_NOT_FOUND);
    }

    let totalAmount = 0;
    order.products = order.products.map(product => {
      const totalPrice = product.productId.price * product.quantity;
      totalAmount += totalPrice;
      return {
        productId: product.productId._id,
        productName: product.productId.productName,
        quantity: product.quantity,
        totalPrice
      };
    });
    order.totalAmount = totalAmount;

    return order.toObject();
  } catch (error) {
    console.log('Something went wrong: Service: removeOrder', error);
    throw new Error(error.message);
  }
};
