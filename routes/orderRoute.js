const express=require('express')
const Order=require('../models/orders')
const verifyTokenMiddleware = require('../jwtmiddleware');
const router = express.Router();


// router.post('/',verifyTokenMiddleware('64ce2d64cfc9555220356f76'),async(req,res)={

//     const {productName}=req.body
// })

router.post('/', verifyTokenMiddleware('64ce2d64cfc9555220356f76') ,async (req, res) => {
    const {products}=req.body
    try {
        const status=true

        const newOrder=new Order({
            orderedBy:req.user.userId,
            products,
            orderDate:new Date(),
        })

        await newOrder.save()

        res.status(201).json ({message:"order is made",data:newOrder})

    } catch (error) {
        console.log("error-->",error)
        res.status(500).json ({message:"Internal server error"})

    }
})

router.post('/getOrderByDateandStore',verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const {fromDate,toDate,orderedBy}=req.body
    try {
       
        let from=new Date(fromDate);
        let to=new Date(toDate)

       console.log("dates-->",from,to,orderedBy)

        const orders=await Order.find({
            orderedBy: orderedBy,
            orderDate:{$gte:from,$lte:to}
        })

        console.log(orders)

        if(!orders){
            res.status(404).json({message:'no record found'})
        }

        res.status(201).json({message:'order fetched',data:orders})

    } catch (error) {
        console.log("error-->",error)
        res.status(500).json({message:'internal server error'})
    }
})


router.post('/getOrderByDate',verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const {fromDate,toDate}=req.body
    try {
       
        let from=new Date(fromDate);
        let to=new Date(toDate)

       //console.log("dates-->",from,to)

       const orders = await Order.find({
        orderDate: { $gte: from, $lte: to }
    }).populate({
        path: 'products.productId', 
        select: 'productName' 
    }).populate('orderedBy', 'userName');

        if(!orders){
            res.status(404).json({message:'no record found'})
        }

        res.status(201).json({message:'order fetched',data:orders})

    } catch (error) {
        console.log("error-->",error)
        res.status(500).json({message:'internal server error'})
    }
})

router.get('/searchbyProduct/:productId',verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const productId = req.params.productId;
    try {
        const orders = await Order.find({
            products: {
                $elemMatch: { productId: productId }
            }
        });
        if (orders.length === 0) {
            res.status(404).json({ message: 'No orders found containing the product' });
        } else {
            res.status(200).json({ message: 'Orders containing the product', data: orders });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


router.post('/search',verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const {orderedBy}=req.body
    try {
       // console.log(orderedBy)
        searchCriteria={
            orderedBy:orderedBy
        }
        console.log(searchCriteria)
        const order=await Order.find(searchCriteria)
        if(!order){
            res.status(404).json({message:'No order found'})
        }
        res.status(201).json({message:"order fetched",data:order})
    } catch (error) {
        console.log("error--->",error)
        res.status(501).json({message:"Internal server error"})
        
    }
})




module.exports = router;