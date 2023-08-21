const mongoose = require('mongoose');

const commanScema=new mongoose.Schema({
    status:{type:Boolean,required:true},
    createdDate:{type:Date,required:true},
    createdBy:{type:String,required:true},
    updatedDate:{type:Date,required:true},
    updatedBy:{type:String,required:true}
})

const Comman=mongoose.model('Comman',commanScema)

module.exports=Comman