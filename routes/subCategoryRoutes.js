const express = require('express');
const SubCategory=require('../models/subcategory')
const router=express.Router()
const verifyTokenMiddleware = require('../jwtmiddleware');

router.post('/', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const {subCategoryName,brandIds,categoryId}=req.body
    try {
        const newCategory=new SubCategory({
          subCategoryName,
          brandIds,
          categoryId,
          status:true,
          createdAt:new Date(),
          createdBy:req.user.userId, 
          isActive:true 
        })
        await newCategory.save()

        res.status(201).json({message:'subcategory added successfully',data:newCategory})

    } catch (error) {
        console.log('error--->',error)
        res.status(500).json({message:'Internal servar error'})
    }
})

router.post('/search', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const{subCategoryName,brandIds,categoryId}=req.body
    try {
        searchcriteria={}
        if(subCategoryName){
            searchcriteria.subCategoryName=subCategoryName
        }
        if(brandIds){
            searchcriteria.brandIds=brandIds
        }
        if(categoryId){
            searchcriteria.categoryId=categoryId
        }

        const subcategory=await SubCategory.find(searchcriteria)
        if(!subcategory){
            res.status(401).json({message:'no user found'})
        }
        res.status(201).json({message:'record fetched',subcategory:subcategory})

    } catch (error) {
        console.log("error-->",error)
        res.status(500).json({message:'internal server error'})
    }
})

router.patch('/update/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const subcatId=req.params.id
    const updateData=req.body
     try {
        updateData.updatedAt=new Date()
        updateData.updatedBy=req.user.userId
    const updatedRecord=await SubCategory.findByIdAndUpdate(subcatId,{$set:updateData},{new:true}) 
        if(!updatedRecord){
            res.status(401).json({message:'no record found'})
        }
        res.status(201).json({message:"data updated",updatedData:updatedRecord})

    } catch (error) {
        console.log("error---->",error)
        res.status(500).json({message:'Internal Server error'})
    }
})

router.get('/:categoryId', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    try {
        const { categoryId} = req.params;
        console.log("categoryId",categoryId)
        const conditions = {}
        if (categoryId) conditions.categoryId = categoryId;
        console.log("conditions---->",conditions)

         conditions.isActive = true

        const allsubCategory=await SubCategory.find(conditions)
        if(!allsubCategory){
            res.status(400).json({message:'category not found'})
        }
        res.status(201).json({message:'category fetched',subcategories:allsubCategory})
    } catch (error) {
        console.log("error----->",error)
        res.status(500).json({message:'internal server error'})
    }

})

router.post('/delete/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{

const {id}=req.params
console.log(req.params)
try {
    // console.log("Id--->",id)
    const doc = await SubCategory.findById(id);
    
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
