const express = require('express');
const verifyTokenMiddleware = require('../jwtmiddleware');
const state=require('../models/states')
const router = express.Router();

router.post('/', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const {stateName,stateCode}=req.body

    try {
        const newState=new state({
            stateName,
            stateCode,
            status:true,
            isActive:true,
            createdAt:new Date(),
            createdBy:req.user.userId
        })
        await newState.save();
        res.status(201).json({ message: 'state added successfully', state: newState });
        
    } catch (err) {
        console.error('Error adding member:', err);
        res.status(500).json({ message: 'Internal server error' }); 
    }

})

router.patch('/update/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const stateId=req.params.id
    const updateData=req.body
    try {
        updateData.updatedAt=new Date()
        updateData.updatedBy=req.user.userId
        // updateData.status=true
        // updateData.isActive=true
        // updateData.createdAt=new Date()
        // updateData.createdBy=req.user.userId

        const updatedRecord=await state.findByIdAndUpdate(stateId, { $set: updateData },{new:true})

        if(!updatedRecord){
            res.status(404).json({message:'no record found for update'})
        }

        res.status(200).json({message:'record updated successfully',reord:updatedRecord})

    } catch (error) {
            console.log("error--->",error)
            res.status(501).json({message:"internal server error"})
        
    }
})

router.post('/search', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const {stateName,stateCode}=req.body
    const searchCriteria={}
    try {
        if(stateName){
            searchCriteria.stateName=stateName
        }
        if(stateCode){
            searchCriteria.stateCode=stateCode
        }
         const fetchedRecord=await state.find(searchCriteria)

        if(!searchCriteria){
            res.status(404).json({message:"no record found"})
        }
        res.status(200).json({message:"found record",data:fetchedRecord})
    } catch (error) {
        console.log("error-->",error)
        res.status(500).json({message:"Internal server error"})
    }
})

router.post('/delete/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const {id}=req.params
   
    try {
        // console.log("Id--->",id)
        const doc = await state.findById(id);
        
    if (!doc) {
        return res.status(404).json({ error: 'Document not found' });
      }
        doc.isActive = false;
        doc.status=false
        await doc.save();
     return res.status(200).json({ message: 'record has been deleted' });
    } catch (error) {
        console.log('eroor-->',error)
        res.status(500).json({message:'internal server error'})
    }
})


module.exports = router;
