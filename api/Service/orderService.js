const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const constants = require('../constants')




module.exports.createOrder = async (serviceData) => {
    try {
      const productIds = serviceData.productId;
      const validProducts = await Product.find({ '_id': { $in: productIds } });
  
      if (validProducts.length !== productIds.length) {
        throw new Error('One or more product IDs are invalid');
      }
  
      if (!serviceData.orderStatus) {
        serviceData.orderStatus = 'pending';
      }
  
      const newOrder = new Order({ ...serviceData });
      const result = await newOrder.save();
  
      let savedOrder = await Order.findById(result._id).populate({
        path: 'productId',
        select: 'productName'
      });
  
      let formattedOrder = mongoDbDataFormat.formatMongoData(savedOrder);
      formattedOrder.products = formattedOrder.productId.map(product => ({
        productId: product._id,
        productName: product.productName
      }));
      delete formattedOrder.productId; 
  
      return formattedOrder;
    } catch (error) {
      console.log('Something went wrong: Service: createOrder', error);
      throw new Error(error);
    }
  };
  

  

  module.exports.retrieveAllOrders = async ({ skip = 0, limit = 10 }) => {
    try {
      let orders = await Order.find({})
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .populate({
          path: 'productId',
          select: 'productName'
        });
  
      let formattedOrders = mongoDbDataFormat.formatMongoData(orders);
      formattedOrders = formattedOrders.map(order => {
        order.products = order.productId.map(product => ({
          productId: product._id,
          productName: product.productName
        }));
        delete order.productId; 
        return order;
      });
  
      return formattedOrders;
    } catch (error) {
      console.log('Something went wrong: Service: retrieveAllOrders', error);
      throw new Error(error);
    }
  };



  module.exports.retrieveOrdersByUserId = async (userId, { skip = 0, limit = 10 }) => {
    try {
      mongoDbDataFormat.checkObjectId(userId);
       skip = parseInt(skip) || 0;
      limit = parseInt(limit) || 10;
      
      let orders = await Order.find({ userId })
        .populate({
          path: 'productId',
          select: 'productName'
        })
        .skip(skip)
        .limit(limit);
  
      if (!orders || orders.length === 0) {
          return [];
      }
  
      let formattedOrders = mongoDbDataFormat.formatMongoData(orders);
      formattedOrders = formattedOrders.map(order => {
        order.products = order.productId.map(product => ({
          productId: product._id,
          productName: product.productName
        }));
        delete order.productId; 
        return order;
      });
  
      return formattedOrders;
    } catch (error) {
      console.log('Something went wrong: Service: retrieveOrdersByUserId', error);
      throw new Error(error.message);
    }
  };

  module.exports.updateExitingOrder = async ({ id, updateInfo }) => {
    try {
      mongoDbDataFormat.checkObjectId(id);
      let order = await Order.findOneAndUpdate(
        { _id: id },
        updateInfo,
        { new: true }
      ).populate('productId', 'productName');
      if (!order) {
        throw new Error(constants.orderMessage.Order_NOT_FOUND);
      }
     const formattedOrder = mongoDbDataFormat.formatMongoData(order);

     formattedOrder.productId = formattedOrder.productId.map(product => product.productName);

     return formattedOrder;
    } catch (error) {
      console.log('Something went wrong: Service: updateOrder', error);
      throw new Error(error);
    }
  }
 
  
  module.exports.removeOrder = async ({ id }) => {
    try {
      mongoDbDataFormat.checkObjectId(id);
      let order = await Order.findByIdAndDelete(id).populate({
        path: 'productId',
        select: 'productName'
      });
      if (!order) {
        throw new Error(constants.orderMessage.Order_NOT_FOUND);
      }
  
      let formattedOrder = mongoDbDataFormat.formatMongoData(order);
      formattedOrder.products = formattedOrder.productId.map(product => ({
        productId: product._id,
        productName: product.productName
      }));
      delete formattedOrder.productId; 
  
      return formattedOrder;
    } catch (error) {
      console.log('Something went wrong: Service: removeOrder', error);
      throw new Error(error);
    }
  };

