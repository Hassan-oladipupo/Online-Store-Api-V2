const productService = require('../Service/productService');
const constants = require('../constants');

module.exports.createProduct = async (req, res) =>
{
  let response = {...constants.customServerResponse }; 
  try {
    const serviceResponse = await productService.createProduct(req.body);
    response.status = 201;
    response.message = constants.productMessage.PRODUCT_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    console.log('Something went wrong: Controller: createProduct', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.retrieveAllProducts = async (req, res) =>
  {
    let response = {...constants.customServerResponse }; 
    try {
      const serviceResponse = await productService.retrieveAllProducts(req.query);
      response.status = 200;
      response.message = constants.productMessage.PRODUCT_FETCHED;
      response.body = serviceResponse;
    } catch (error) {
      console.log('Something went wrong: Controller: createProduct', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }

  module.exports.retrieveProductById = async (req, res) => {
    let response = {...constants.customServerResponse }; 
    try {
      const serviceResponse = await productService.retrieveProductById(req.params);
      response.status = 200;
      response.message = constants.productMessage.PRODUCT_FETCHED;
      response.body = serviceResponse;
    } catch (error) {
      console.log('Something went wrong: Controller: getProductById', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }



  module.exports.updateExitingProduct = async (req, res) => {
    let response = {...constants.customServerResponse }; 
    try {
      const responseFromService = await productService.updateExitingProduct({
        id: req.params.id,
        updateInfo: req.body
      });
      response.status = 200;
      response.message = constants.productMessage.PRODUCT_UPDATED;
      response.body = responseFromService;
    } catch (error) {
      console.log('Something went wrong: Controller: updateProduct', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }


  module.exports.removeProduct = async (req, res) => {
    let response = {...constants.customServerResponse }; 
    try {
      const serviceResponse = await productService.removeProduct(req.params);
      response.status = 200;
      response.message = constants.productMessage.PRODUCT_REMOVED;
      response.body = serviceResponse;
    } catch (error) {
      console.log('Something went wrong: Controller: deleteProduct', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }