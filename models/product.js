const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
productName: { type: String, required: true },
category: { type: String, required: true },
subCategory:{type:String,required:true},
brandId:{type:String,required:true},
Status:{type:Boolean},
isActive:{type:Boolean},
createdAt:{type:Date,required:true},
createdBy:{type:String,required:true},
updatedAt:{type:Date},
updatedBy:{type:String},
storId:{type:String,},
productCost:{type:Number,required:true},
productPrice:{type:Number,required:true},
tax:{type:Number,required:true},
taxMethod:{type:String,required:true},
productQuantity:{type:Number,required:true},
productDescription:{type:String,required:true},
productImage:{type:String},
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
