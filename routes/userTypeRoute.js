const express=require('express')
const userType=require('../models/userType')
const verifyTokenMiddleware = require('../jwtmiddleware');
// const UserType = require('../models/userType');
const router = express.Router();


router.post('/', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'), async(req,res)=>{
    const { name,level} = req.body
   
    try {
      const newUserType=new userType(
        {name,
        level,
        status:true,
        createdAt:new Date(),
        createdBy:req.user.userId,
        isActive:true
        }) 
      
        await newUserType.save()

      res.status(201).json({ message: 'usertype added successfully', data: newUserType});


    } catch (error) {
        console.error('Error adding Product:', error);
    res.status(500).json({ message: 'Internal server error' });
    }
})

router.patch('/update/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const usertypeId=req.params.id
    const updateData=req.body

    console.log("userId-->",usertypeId)

    updateData.updatedAt=new Date();
    updateData.updatedBy=req.user.userId

    try {
        if(Object.keys(updateData).length===0){
            res.status(400).json({message:'mo updated field'})
        }
        const updatedUser=await UserType.findByIdAndUpdate(usertypeId,{$set:updateData},{new:true})
     if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });   

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });  
    }
})

router.get('/',verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    try {
       const allUserType=await userType.find() 
       res.status(201).json({message:"all userType",data:allUserType})
    } catch (error) {
        console.error('Error adding Product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

router.post('/delete/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{

    const {id}=req.params
    console.log(req.params)
    try {
        // console.log("Id--->",id)
        const doc = await userType.findById(id);
        
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

module.exports = router;