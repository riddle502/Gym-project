const mongoose = require('mongoose');

const stateSchema= new mongoose.Schema({
    stateName:{type:String,required:true},
    stateCode:{type:String},
    status:{type:Boolean},
    isActive:{type:Boolean},
    createdAt:{type:Date},
    createdBy:{type:String},
    updatedAt:{type:Date},
    updatedBy:{type:String}
   
})


const State=mongoose.model('State',stateSchema)

module.exports = State;