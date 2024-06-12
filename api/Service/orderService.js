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
      const newOrder = new Order({...serviceData});
      const result = await newOrder.save();
      return mongoDbDataFormat.formatMongoData(result);
    } catch (error) {
      console.log('Something went wrong: Service: createOrder', error);
      throw new Error(error);
    }
  };
  

  

  module.exports.retrieveAllOrders = async ({ skip = 0, limit = 10 }) => {
    try {
      let orders = await Order.find({}).skip(parseInt(skip)).limit(parseInt(limit));
     
      return mongoDbDataFormat.formatMongoData(orders);
    } catch (error) {
      console.log('Something went wrong: Service: retrieveAllOrder', error);
      throw new Error(error);
    }
  }



 


  module.exports.retrieveOrdersByUserId = async (userId) => {
    try {
        mongoDbDataFormat.checkObjectId(id)
        let order = await Order.findById(id);
        if (!order) {
          throw new Error(constants.orderMessage.Order_NOT_FOUND);
        }
        return mongoDbDataFormat.formatMongoData(order);
      } catch (error) {
        console.log('Something went wrong: Service: getProductById', error);
        throw new Error(error);
      }
}



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
      console.log('Something went wrong: Service: updateProduct', error);
      throw new Error(error);
    }
  }
 
  
  module.exports.removeOrder = async ({ id }) => {
    try {
      mongoDbDataFormat.checkObjectId(id);
      let order = await Order.findByIdAndDelete(id);
      if (!order) {
        throw new Error(constants.orderMessage.Order_NOT_FOUND);
      }
      return mongoDbDataFormat.formatMongoData(order);
    } catch (error) {
      console.log('Something went wrong: Service: deleteOrder', error);
      throw new Error(error);
    }
  }

