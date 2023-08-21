const mongoose = require('mongoose');


const userTypeSchema=new mongoose.Schema({
    name:{type:String,required:true},
    level:{type:Number,},
    status:{type:Boolean},
    createdAt:{type:Date,required:true},
    createdBy:{type:String,required:true},
    isActive:{type:Boolean},
    updatedAt:{type:Date},
    updatedBy:{type:String}
})



const UserType=mongoose.model('UserType',userTypeSchema)


module.exports=UserType