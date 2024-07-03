const mongoose = require('mongoose');

const deliveryFeeSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  state: String,
  location: String,
  productId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
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

module.exports = mongoose.model('DeliveryFee', deliveryFeeSchema);
