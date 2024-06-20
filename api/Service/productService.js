const Product = require('../models/productModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const constants = require('../constants')




module.exports.createProduct = async (serviceData) => {
    try {
      let product = new Product({ ...serviceData });
      result =  await product.save();
      return mongoDbDataFormat.formatMongoData(result);
      
    } catch (error) {
      console.log('Something went wrong: Service: createProduct', error);
      throw new Error(error);
    }
  }


  module.exports.retrieveAllProducts = async ({ skip = 0, limit = 10 }) => {
    try {
      let products = await Product.find({}).skip(parseInt(skip)).limit(parseInt(limit));
     
      return mongoDbDataFormat.formatMongoData(products);
    } catch (error) {
      console.log('Something went wrong: Service: getAllProducts', error);
      throw new Error(error);
    }
  }



  module.exports.retrieveProductById = async ({ id }) => {
    try {
      mongoDbDataFormat.checkObjectId(id)
      let product = await Product.findById(id);
      if (!product) {
        throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
      }
      return mongoDbDataFormat.formatMongoData(product);
    } catch (error) {
      console.log('Something went wrong: Service: retrieveProductById', error);
      throw new Error(error);
    }
  }


  module.exports.updateExitingProduct = async ({ id, updateInfo }) => {
    try {
      mongoDbDataFormat.checkObjectId(id);
      let product = await Product.findOneAndUpdate(
        { _id: id },
        updateInfo,
        { new: true }
      )
      if (!product) {
        throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
      }
      return mongoDbDataFormat.formatMongoData(product);
    } catch (error) {
      console.log('Something went wrong: Service: updateProduct', error);
      throw new Error(error);
    }
  }


  
  module.exports.removeProduct = async ({ id }) => {
    try {
      mongoDbDataFormat.checkObjectId(id);
      let product = await Product.findByIdAndDelete(id);
      if (!product) {
        throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
      }
      return mongoDbDataFormat.formatMongoData(product);
    } catch (error) {
      console.log('Something went wrong: Service: deleteProduct', error);
      throw new Error(error);
    }
  }


  module.exports.searchProducts = async (queryParameters) => {
    const { name, minPrice, maxPrice, minMoQ, maxMoQ, description,brand } = queryParameters;
    let query = {};
  
    if (name) {
      query.productName = { $regex: name, $options: 'i' }; 
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice.replace(/,/g, ''));
      if (maxPrice) query.price.$lte = parseFloat(maxPrice.replace(/,/g, ''));
    }
    if (minMoQ || maxMoQ) {
      query.minimumOrderQuantity = {};
      if (minMoQ) query.minimumOrderQuantity.$gte = parseInt(minMoQ, 10);
      if (maxMoQ) query.minimumOrderQuantity.$lte = parseInt(maxMoQ, 10);
    }
    if (description) {
      query.productDescription = { $regex: description, $options: 'i' }; 
    }
    if (brand) {
      query.productBrand = { $regex: brand, $options: 'i' }; 
    }
    console.log("Query Object:", query);
  
     const result = await Product.find(query);
     return result;
  };