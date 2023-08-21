const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    productId:{type:String,required:true},
    productName: { type: String, required: true },
    category: { type: String, required: true },
    productCost:{type:Number,required:true},
    productPrice:{type:Number,required:true},
    // saleAmount:{type:Number,required:true},
    // profit:{type:Number,required:true},
    tax:{type:Number,required:true},
    taxMethod:{type:String,required:true},
    saleQuantity:{type:Number,required:true},
    productDescription:{type:String,required:true}
    
      // Add other fields as needed
});

const Sale = mongoose.model('Sale', salesSchema);

module.exports = Sale;