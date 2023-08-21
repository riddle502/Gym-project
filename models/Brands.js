const mongoose = require('mongoose');

const BrandSchema=new mongoose.Schema({
    brandname:{type:String},
    status:{type:Boolean},
    createdAt:{type:Date},
    createdBy:{type:String},
    isActive:{type:Boolean},
    updatedAt:{type:Date},
    updatedBy:{type:String},
    logo:{type:String}
})

const Brand=mongoose.model('Brand',BrandSchema)

module.exports=Brand