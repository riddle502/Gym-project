const express=require('express')
const Store=require('../models/store')
const verifyTokenMiddleware = require('../jwtmiddleware');

const router = express.Router();

router.post('/',verifyTokenMiddleware,async (req,res)=>{
    const {storeName,storeEmal,storeMobileNumber,storeAddress,storeGst,storePassword,storeType,storeDescription}=req.body

    try {
        
        const newStore=new Store({storeName,storeEmal,storeMobileNumber,storeAddress,storeGst,storePassword,storeType,storeDescription})
        await newStore.save()
        res.status(201).json({ message: 'store added successfully', store: newStore });

    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ message: 'Internal server error' });   
    }

})


module.exports = router;