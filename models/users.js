const mongoose = require ('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs')

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userType:{type:String,required:true},
  status:{type:Boolean,required:true},
  age: { type: Number,},
  email: {type: String},
  password:{type:String , required:true},
  mobileNo: { type: Number, required: true ,unique:true},
  address:{type: String},
  cityId:{type:String,},
  stateId:{type:Number},
  createdAt:{type:Date,required:true},
  createdBy:{type:String,required:true},
  isActive:{type:Boolean},
  pancard:{type:String},
  Aadharcard:{type:String},
  MacAddress:{type:String},
 updatedAt:{type:String},
  updatedBy:{type:String},
  gst:{type:String},
  assignedProducts: [{}]
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next()

  this.password=await bcrypt.hash(this.password,12);

  next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;






