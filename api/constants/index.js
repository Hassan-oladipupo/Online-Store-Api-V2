module.exports = {
  customServerResponse: {
    status: 400,
    message: '',
    body: {}
  },
  productMessage: {
    PRODUCT_CREATED: 'Product Created Successfully',
    PRODUCT_FETCHED: 'Product Fetched Successfully',
    PRODUCT_UPDATED: 'Product Updated Successfully',
    PRODUCT_REMOVED: 'Product Removed Successfully',
    PRODUCT_NOT_FOUND: 'Product Not Found',
    EMPTY_PRODUCT: 'No Product Found'
  },
  orderMessage: {
    Order_CREATED: 'Order Placed Successfully',
    Order_FETCHED: 'Order Fetched Successfully',
    Order_REMOVED: 'Order Removed Successfully',
    Order_NOT_FOUND: 'Order Not Found',
    Order_UPDATED: 'Order Updated Successfully',
  },
  userMessage: {
    SIGNUP_SUCCESS: 'Signup Success',
    LOGIN_SUCCESS: 'Login Success',
    DUPLICATE_EMAIL: 'User already exist with given email',
    USER_NOT_FOUND: 'User not found',
    INVALID_PASSWORD: 'Incorrect Password',
    INVALID_EMAIL: 'Invalid email format',
    WEAK_PASSWORD: 'Weak password. Password must contain at least 8 characters including uppercase, lowercase and digit',
  },
  requestValidationMessage: {
    BAD_REQUEST: 'Invalid fields',
    TOKEN_MISSING: 'Token missing from header',
    FORBIDDEN: 'Access denied. Admins only.',
  },
  databaseMessage: {
    INVALID_ID: 'Invalid Id'
  }
}
