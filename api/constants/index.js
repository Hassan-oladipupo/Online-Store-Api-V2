module.exports = {
  customServerResponse: {
    status: 400,
    message: '',
    body: {}
  },
  productMessage: {
    PRODUCT_CREATED: 'Product Created Successfully',
    PRODUCT_FETCHED: 'Product(s) Fetched Successfully',
    PRODUCT_UPDATED: 'Product Updated Successfully',
    PRODUCT_REMOVED: 'Product Removed Successfully',
    PRODUCT_NOT_FOUND: 'Product Not Found',
    EMPTY_PRODUCT: 'No Product Found',
    PRODUCT_ITEM_REQUIRE: "productId and quantityChange are required",
    INVALID_PRODUCT_ID:  "One or more product IDs are invalid",
    MOQ_NOT_MET: (productName, moq) => `The quantity for product ${productName} must be at least ${moq}`,
     PRODUCT_ID_NOT_FOUND: (productId) => `Product with ID ${productId} not found`
  },
  CartMessage: {
    CART_CREATED: 'Product Successfully Added to Cart',
    CART_FETCHED: 'Cart(s) Fetched Successfully',
    CART_UPDATED: 'Cart Updated Successfully',
    CART_REMOVED: 'Product Remove from Cart',
     EMPTY_CART: 'No Item Found in Cart'
   
  },
  orderMessage: {
    ORDER_CREATED: 'Order Placed Successfully',
    ORDER_FETCHED: 'Order(s) Fetched Successfully',
    ORDER_REMOVED: 'Order Removed Successfully',
    ORDER_NOT_FOUND: 'Order Not Found',
    USER_ORDER_NOT_FOUND: 'No Order Found For User',
    ORDER_UPDATED: 'Order Updated Successfully',
  },
  deliveryFeeMessage: {
    DELIVERY_FEE_CREATED: 'Delivery fee Added Successfully',
    DELIVERY_FEE_FETCHED: 'Delivery fee (s) Fetched Successfully',
    DELIVERY_FEE_UPDATED: 'Delivery fee Updated Successfully',
    DELIVERY_FEE_REMOVED: 'Delivery fee Removed Successfully',
    Delivery_FEE_NOT_FOUND: 'Delivery fee not found',
  },
  reviewMessage: {
    REVIEW_CREATED: 'Review added Successfully',
    REVIEW_FETCHED: 'Review(s)  Fetched Successfully',
    REVIEW_REMOVED: 'Review Removed Successfully',
    REVIEW_NOT_FOUND: 'Review Not Found',
    REVIEW_UPDATED: 'Review Updated Successfully',
    REVIEW_UNAUTHORIZED: "Access denied",
    USER_NOT_FOUND: 'User not found',
  },
  userProfileMessage: {
    USERPROFILE_CREATED: 'User Profile Added Successfully',
    USERPROFILE_FETCHED: 'User Profile Fetched Successfully',
    USERPROFILE_UPDATED: 'User Profile Update Successfully',
    USERPROFILE_NOT_FOUND: 'User Profile not found',
    USERPROFILE_DELETED: 'User Profile Deleted Successfully ',
    PROFILE_IMAGE_UPLOAD: 'Profile Image Uploaded Successfully',
  
  },
  userMessage: {
    SIGNUP_SUCCESS: 'Signup Success',
    LOGIN_SUCCESS: 'Login Success',
    DUPLICATE_EMAIL: 'User already exist with given email',
    USER_NOT_FOUND: 'User not found',
    INVALID_PASSWORD: 'Incorrect Password',
    INVALID_EMAIL: 'Invalid email format',
    WEAK_PASSWORD: 'Weak password. Password must contain at least 8 characters including uppercase, lowercase and digit',
    RESET_PASSWORD: 'Reset password link sent successfully',
    RESET_NEW_PASSWORD: 'Password reset successfully confirmed.',
    MATCH_PASSWORD: 'New password and confirm password must match.',
    INVALID_TOKEN: 'Invalid confirmation token.',
    EMAIL_ALREADY_CONFIRMED: 'Email address has already been confirmed.',
    CONFIRM_TOKEN_SUCCESS: 'Email confirmed successfully'
  },
  requestValidationMessage: {
    BAD_REQUEST: 'Invalid fields',
    TOKEN_MISSING: 'Token missing from header',
    FORBIDDEN: 'Access denied. Admins only.',
  },
  paymentServiceMessage: {
    INITIALIZE_SUCCESS: 'Payment initialized successfully',
    VERIFY_SUCCESS: 'Payment verified successfully',
    INITIALIZED_FAILED: "Payment initialization failed",
    VERIFY_FAILED: "Payment verification failed"
  },
  databaseMessage: {
    INVALID_ID: 'Invalid Id'
  }
}
