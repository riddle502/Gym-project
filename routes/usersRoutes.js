// membersRoutes.js
const express = require('express');
const User = require('../models/users');
const verifyTokenMiddleware = require('../jwtmiddleware');


const router = express.Router();

router.post('/', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215') ,async (req, res) => {
  const { userName,userType,age, email,password,mobileNo,address,cityId,stateId,pancard,Aadharcard,MacAddress,gst } = req.body;

  
  try {
    const status=true
    const newUser = new User(
      {  
        userName,
        userType,
        status,
        age,
        email:email||null,
        password,
        mobileNo,
        address,
        cityId,
        stateId,
        createdAt:new Date().toISOString(),
        createdBy:req.user.userId,
        isActive:true,
        pancard,
        Aadharcard,
        MacAddress:MacAddress||null,
        createdBy:req.user.userId,
        gst:gst||null,
      });
    await newUser.save();

    res.status(201).json({statusCode: 1,message: 'User added successfully',user: newUser });
  } catch (err) {
    console.error('Error adding member:', err);
    res.status(500).json({ message: 'Internal server error' });
  }

});

router.post('/search', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
  const {mobileNo,email,userId,stateId,cityId,userName,userType,createdDate}=req.body

  try {
    const searchCriteria = {};
    if(mobileNo){
      searchCriteria.mobileNo=mobileNo
    }
    if(email){
      searchCriteria.email=email;
    }
    if(stateId){
      searchCriteria.stateId=stateId;
    }
    if(cityId){
      searchCriteria.cityId=cityId
    }
    if(userName){
      searchCriteria.userName=userName
    }
    if(userType){
      searchCriteria.userType=userType
    }
    if(createdDate){
      searchCriteria.createdDate=createdDate
    }
    if(userId){
      searchCriteria._id=userId
    }

    const foundUsers = await User.find(searchCriteria);
    

     if(!foundUsers.length==0){
      res.status(200).json({ message: 'Users found', users: foundUsers });
    }
    else{
      res.status(404).json({mesage:'no data found'})
    }
  
  } catch (error) {
    console.error('Error searching for users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.post('/seller',verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
  const {userType}=req.body
  console.log("body",req.body)
 // console.log("userid",req.user.userId)
  try {
    searchCriteria={}
   searchCriteria.userType=userType
    const foundUser=await User.find(searchCriteria)
    if(!foundUser){
      res.status(404).json({message:'no userfound',})
    }
    res.status(201).json({mesage:'user fetched',data:foundUser})

  } catch (error) {
    console.log("error-->",error)
    res.status(501).json({message:'Internal server error'})
    
  }
} )

router.get('/getStore',verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
  try {
    searchCriteria={
      userType:'64ce2d64cfc9555220356f76'
    }
    const foundUser=await User.find(searchCriteria)
    if(!foundUser){
      res.status(404).json({message:'no userfound',})
    }
    res.status(201).json({mesage:'user fetched',data:foundUser})
  } catch (error) {
    console.log("error-->",error)
    res.status(501).json({message:'Internal server error'})
  }
})

router.patch('/update/:userId', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
  const userId = req.params.userId;
  const updateData = req.body;

  try {
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, {$set:updateData}, { new: true });
  
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
  res.status(200).json({ message: 'User updated successfully', user: updatedUser });

  } catch (error) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.get('/', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
  try {
    const allUsers=await User.find();
    res.status(201).json({mesage:'all users',users:allUsers})
  } catch (error) {
    console.error('Error searching for users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
})


// router.delete('/:userId',verifyTokenMiddleware ,async(req,res)=>{
//   const userId=req.params.userId
//   try {
//     const existingUser=await User.findById(userId)
//     if(!existingUser){
//       res.status(404).json({message:"no user found"})
//     }
//     await User.findByIdAndRemove(userId)
//     res.status(201).json({message:'user deleted successfully'})
//     } catch (error) {
    
//   }
// })

router.post('/delete/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{

  const {id}=req.params
  console.log(req.params)
  try {
      // console.log("Id--->",id)
      const doc = await User.findById(id);
      
  if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }
      doc.isActive = false;
      await doc.save();
   return res.status(200).json({ message: 'record has been deleted' });
  } catch (error) {
      console.log('eroor-->',error)
      res.status(500).json({message:'isActive field updated to inactive'})
  }

})

// Add other member-related routes as needed

module.exports = router;
