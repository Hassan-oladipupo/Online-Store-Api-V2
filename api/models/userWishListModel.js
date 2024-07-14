const mongoose = require('mongoose');



const userWishListSchema = new mongoose.Schema({

  productName: String,
  productPrice: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

}, {
  timestamps: true,
  toObject: {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model('userWishList', userWishListSchema);
