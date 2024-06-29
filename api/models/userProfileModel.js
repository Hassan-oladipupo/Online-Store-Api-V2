const mongoose = require('mongoose');

const billingAddressSchema = new mongoose.Schema({
  billingFirstName: String,
  billingLastName: String,
  billingAddress1: String,
  billingAddress2: String,
  billingPhoneNumber: String,
  billingEmailAddress: String,
  country: String,
  state: String,
  city: String,
  zipCode: String,
}, { _id: false });

const shippingAddressSchema = new mongoose.Schema({
  shippingFirstName: String,
  shippingLastName: String,
  shippingAddress1: String,
  shippingAddress2: String,
  shippingPhoneNumber: String,
  shippingEmailAddress: String,
  country: String,
  state: String,
  city: String,
  zipCode: String,
}, { _id: false });

const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: String,
  firstName: String,
  lastName: String,
  profileImage: String,
  billingAddress: [billingAddressSchema],
  shippingAddress: [shippingAddressSchema],
}, {
  timestamps: true,
  toObject: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
