const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
  productId: String,
  review: String,
  reviewer: String,
  reviewerEmail: String,
  rating: String,
  productId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
 { 
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) =>
      {
        ret.id = ret._id
        delete ret._id
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v
        return ret
      }
    }
 }

  

);

module.exports = mongoose.model('ProductReview', productReviewSchema);
