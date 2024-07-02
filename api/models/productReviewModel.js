const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
  productId: Number,
  review: String,
  reviewer: String,
  reviewerEmail: String,
  rating: String,
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
