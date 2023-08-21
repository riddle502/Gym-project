const mongoose = require ('mongoose');
const validator=require('validator');

const categorySchema=new mongoose.Schema({
   name: {type:String,required:true},
   status:{type:Boolean},
   createdAt:{type:Date,required:true},
   createdBy:{type:String,required:true},
   isActive:{type:Boolean},
   updatedAt:{type:String},
   updatedBy:{type:String}
})

const Category=mongoose.model('Category',categorySchema)
module.exports=Category
