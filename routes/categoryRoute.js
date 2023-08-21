const express = require('express');
const Category=require('../models/category')
const router = express.Router();
const verifyTokenMiddleware = require('../jwtmiddleware');
const { search } = require('./BrandsRoute');
//const User = require('../models/users');


router.post('/', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const {name,status,createdAt,createdBy,updatedAt,updatedBy}=req.body
    try {
        const newCategory=new Category({
            name,
            status:true,
            createdAt:new Date(),
            createdBy:req.user.userId,
            isActive:true
        })
    await newCategory.save();

    res.status(201).json({message:'category added sucessfully',category:newCategory})  
    } catch (error) {
        console.error('Error adding Product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  
})

router.get('/', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    try {
        const allCategory=await Category.find()
        if(!allCategory){
            res.status(400).json({message:'category not found'})
        }
        res.status(201).json({message:'category fetched',categories:allCategory})
    } catch (error) {
        console.log("error----->",error)
        res.status(500).json({message:'internal server error'})
        
    }
})

router.patch('/update/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const categoryId=req.params.id
    const updateData=req.body
    try {
       updateData.updatedAt=new Date()
       updateData.updatedBy=req.user.userId

      const  category=await Category.findByIdAndUpdate(categoryId,{$set:updateData},{new:true})

       if(!category){
        res.status(401).json({message:'no category found'})
       }
       res.status(201).json({message:'category fetched',category:category})
        
    } catch (error) {
       console.log("error--->",error)
       res.status(500).json({message:'Internal server error'}) 
    }
})

router.post('/search', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const name=req.body
    const searchCriteria={}
    try {
        if(!name){
            res.status(401).json({message:'Please provide the name to search'})
        }
        searchCriteria.name=name
        const category=await Category.find(searchCriteria)
        if(!category){
            res.status(401).json({message:'no recod found'})
        } 
        res.status(201).json({message:'record fetched',category:category})       
    } catch (error) {
        console.log("error-->",error)
        res.status(500).json({message:'Internal server error'})
    }
})

router.post('/delete/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{

    const {id}=req.params
    console.log(req.params)
    try {
        // console.log("Id--->",id)
        const doc = await Category.findById(id);
        
    if (!doc) {
        return res.status(404).json({ error: 'Document not found' });
      }
        doc.isActive = false;
        await doc.save();
     return res.status(200).json({ message: 'record has been deleted' });
    } catch (error) {
        console.log('eroor-->',error)
        res.status(500).json({message:'internal server error'})
    }
  
  })


module.exports=router 