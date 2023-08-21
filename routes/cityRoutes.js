const express = require('express');
const verifyTokenMiddleware = require('../jwtmiddleware');

const city=require('../models/city')
const router = express.Router();

router.post('/', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const {cityName,cityCode,stateId}=req.body

    try {
        const newCity=new city({
            cityName,
            cityCode,
            stateId,
            status:true,
            isActive:true,
            createdAt:new Date(),
            createdBy:req.user.userId
        })
        await newCity.save();
        res.status(201).json({ message: 'city added successfully', city: newCity });
        
    } catch (err) {
        console.error('Error adding member:', err);
        res.status(500).json({ message: 'Internal server error' }); 
    }

})

router.patch('/update/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const cityid=req.params.id
    const updateData=req.body
    try {
        updateData.updatedAt=new Date()
        updateData.updatedBy=req.user.userId
        // updateData.status=true
        // updateData.isActive=true

        const updatedRecord=await city.findByIdAndUpdate(cityid,updateData,{new:true})

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
    const {cityName,cityCode,stateId}=req.body
    const searchcriteria={}
    try {
        if(cityName){
            searchcriteria.cityName=cityName
        }
        if(cityCode){
            searchcriteria.cityCode=cityCode
        }
        if(stateId){
            searchcriteria.stateId=stateId
        }

       const fetchedRecord=await city.find(searchcriteria) 
       if(!fetchedRecord){
        res.status(404).json({message:"no record found"})
       }
       res.status(200).json({message:"record found",data:fetchedRecord})
    } catch (error) {
        res.status(500).json({message:"Internal server error"}) 
    }
})

router.post('/delete/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const {id}=req.params
   
    try {
        // console.log("Id--->",id)
        const doc = await city.findById(id);
        
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
