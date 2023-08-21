const mongoose = require('mongoose');

const citySchema= new mongoose.Schema({
    cityName:{type:String,required:true},
    cityCode:{type:String},
    stateId:{type:String,required:true},
    status:{type:Boolean},
    isActive:{type:Boolean},
    createdAt:{type:Date},
    createdBy:{type:String},
    updatedAt:{type:Date},
    updatedBy:{type:String}
})


const City=mongoose.model('City',citySchema)

module.exports = City;