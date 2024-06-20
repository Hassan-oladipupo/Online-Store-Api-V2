const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  price: String,
  productDescription: String,
  imageUrl: String,
  minimumOrderQuantity: String,
  productBrand: String
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

module.exports = mongoose.model('Product', productSchema);
