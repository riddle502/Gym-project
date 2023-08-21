const mongoose = require('mongoose');
const validator=require('validator')

const storeSchema=new mongoose.Schema({
   storeName:{type:"String",required:true},
   storeEmal:{type:"String",required:true,unique:true,validate:{
    validator:function(value){
    return validator.isEmail(value)
    },
    message:'Invalid Email Format'
   }
},
    storeMobileNumber:{type:'Number',required:true},
    storeAddress:{type:'String',required:true},
    storeGst:{type:'Number',required:true},
    storePassword:{type:'String',required:true},
    storeType:{type:'String',required:true},
    storeDescription:{type:'String'}
})

const Store=mongoose.model('Store',storeSchema)

module.exports=Store