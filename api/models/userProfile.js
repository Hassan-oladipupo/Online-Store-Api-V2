const mongoose = require('mongoose');

const billingAddressSchema = new mongoose.Schema({
    billing_firstName: String,
    billing_lastName: String,
    billing_address1: String,
    billing_address2: String,
    billing_phoneNumber: String,
    billing_emailAddress: String,
    country: String,
    state: String,
    city: String,
    zipCode: String,
  }, { _id: false });

  const shippingAddressSchema = new mongoose.Schema({
    shipping_firstName: String,
    shipping_lastName: String,
    shipping_address1: String,
    shipping_address2: String,
    shipping_phoneNumber: String,
    shipping_emailAddress: String,
    country: String,
    state: String,
    city: String,
    zipCode: String,
  }, { _id: false });
  
  const userProfileSchema = new mongoose.Schema({
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
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      }
    }
  });
  
  
module.exports = mongoose.model('UserProfile', userProfileSchema);