const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  contactPerson: String,
  orderStatus: String,
  orderDate: { type: Date, default: Date.now },
  phoneNumber: String,
  deliveryAddress: String,
  totalProduct: Number,
  orderNote: String,
  totalAmount: Number,
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number,
    totalPrice: Number  
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
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

module.exports = mongoose.model('Order', orderSchema);
