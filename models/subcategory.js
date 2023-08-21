
const mongoose = require ('mongoose');
//const Brand=require('./Brands')

const subCategorySchema=new mongoose.Schema({
    subCategoryName:{type:String,required:true},
    brandIds:[{type:String,required:true}],
    categoryId:{type:String,required:true},
    status:{type:Boolean,required:true},
    createdAt:{type:Date,required:true},
    createdBy:{type:String,required:true},
    isActive:{type:Boolean},
    updatedAt:{type:Date},
    updatedBy:{type:String}
    
})

const SubCategory=mongoose.model('SubCategory',subCategorySchema)

module.exports=SubCategory