const express = require('express');
const common=require('../models/comman')

const router = express.Router();

router.post('/',async(req,res)=>{
    const {status,createdDate,createdBy,updatedDate,updatedBy}=req.body;

    try {
        const newCommon=new common({status,createdDate,createdBy,updatedDate,updatedBy})
        await newCommon.save()

        res.status(201).json({ message: 'data added successfully', data: newCommon });
    } catch (err) {
        console.error('Error adding member:', err);
        res.status(500).json({ message: 'Internal server error' });
    }

})

module.exports = router