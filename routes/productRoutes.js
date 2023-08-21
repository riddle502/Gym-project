const express=require('express')
const Product=require('../models/product')
const User=require('../models/users')
const Brand=require('../models/Brands')
const Category=require('../models/category')
const subCategory=require('../models/subcategory')
const multer=require('multer')
const csv=require("csvtojson");
const fs = require('fs');
const verifyTokenMiddleware = require('../jwtmiddleware');
const createUploadMiddleware = require('../fileUpload');

const router = express.Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/csv/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({
    storage,
})

const productImageUpload = createUploadMiddleware('productImage');

router.post('/',productImageUpload.single('productImage'),verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{

    const { productName,category,subCategory,brandId, productCost,productPrice,tax ,taxMethod,productQuantity,productDescription} = req.body;
    const productImage = req.file ? req.file.path:null
try {
    
    const newProduct=new Product({
        productName,
        category,
        subCategory,
        brandId,
        Status:true,
        isActive:true,
        createdAt:new Date(),
        createdBy:req.user.userId, 
        productCost,
        productPrice,
        tax,
        taxMethod,
        productQuantity,
        productDescription,
        productImage
     })
    await newProduct.save()

    res.status(201).json({ message: 'Product added successfully', product: newProduct });


} catch (error) {
    console.error('Error adding Product:', error);
    res.status(500).json({ message: 'Internal server error' });
}

})

router.get('/',verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    try {
       const allProducts=await Product.find() 
       res.status(201).json({message:"all products",products:allProducts})
    } catch (error) {
        console.error('Error adding Product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

router.get('/:productid',async(req,res)=>{
    try {

        const productId = req.params.productid;

        // const objectIdProductId = ObjectId(productId);
    
       // const objectIdProductId = productId;
        const products=await Product.find({ _id: { $in: productId } })

        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
          }

          res.status(200).json(products);
        
    } catch (error) {
        console.error('Error adding Product:', error);
        res.status(500).json({ message: 'Internal server error' });  
    }

})

router.patch('/update/:id',productImageUpload.single('productImage'), verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
const productId=req.params.id
const updateData=req.body
try {
    if(req.file){
        updateData.productImage=req.file.path
    }
    updateData.updatedAt=new Date()
    updateData.updatedBy=req.user.userId
    const product=await Product.findByIdAndUpdate(productId,{$set:updateData},{new:true})

    if(!product){
        res.status(401).json({message:"no product found"})
    }
    res.status(201).json({message:'product updated',product:product})

} catch (error) {
    console.log("error-->",error)
   res.status(501).json({message:'Internal server error'})
}

})

router.post('/search', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const { productName,category,subCategory,brandId, productCost,productPrice,tax ,taxMethod,productQuantity,productDescription}=req.body
   searchcriteria={}
    try 
    {
    if(productName){
        searchcriteria.productName=productName
    }
    if(category){
        searchcriteria.category=category
    }
    if(subCategory){
        searchcriteria.subCategory=subCategory
    }
    if(brandId){
        searchcriteria.brandId=brandId
    }
    if(productCost){
        searchcriteria.productCost=productCost
    }
    if(productPrice){
        searchcriteria.productPrice=productPrice
    }
    if(tax){
        searchcriteria.tax=tax
    }
    if(taxMethod){
        searchcriteria.taxMethod=taxMethod
    }
    if(productQuantity){
        searchcriteria.productQuantity=productQuantity
    }
    if(productDescription){
        searchcriteria.productDescription=productDescription
    }

    const foundProduct=await Product.find(searchcriteria)
    if(!foundProduct){
        res.status(401).json({message:'no product found'})
    }
    res.status(201).json({message:"product fetched",product:foundProduct})
        
    } catch (error) {
        console.log("error-->",error)
        res.status(500).json({message:"internal server error"})
        
    }
})

router.get('/', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    try {
        const allproducts=await Product.find()
        if(!allproducts){
            res.status(401).json({message:"there is no product found"})
        }
        res.status(201).json({message:"product fetched",allproducts:allproducts})
    } catch (error) {
        console.log("error--->",error)
        res.status(500).json({message:'internal server error'})
    }
})

router.post('/delete/:id', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{  

    const {id}=req.params
   
    try {
        // console.log("Id--->",id)
        const doc = await Product.findById(id);
        
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
// router.post('/bulk',upload.single('csvFile'), verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async (req,res)=>{
//     try {
//         const jsonArray=await csv().fromFile(req.file.path)
//         for(const data of jsonArray){
//             const newProduct=new Product(data)
//             newProduct.Status=true
//             newProduct.isActive=true
//             newProduct.createdAt=new Date()
//             newProduct.createdBy=req.user.userId
//             await newProduct.save();
//         }
//         fs.unlinkSync(req.file.path);
//         res.status(201).json({ message: 'Bulk product addition successful' });
     
//     } catch (error) {
//         console.error('Error adding Product:', error);
//         res.status(500).json({ message: 'Internal server error' }); 
//     }
// })

router.post('/bulk', upload.single('csvFile'), verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'), async (req, res) => {
    try {
        const jsonArray = await csv().fromFile(req.file.path);
        for (const data of jsonArray) {
            const brand=await Brand.findOne({brandName:data.brandname})
            const category = await Category.findOne({ name: data.categoryName });
            const subcategory = await subCategory.findOne({ subcategoryName: data.subcategoryName });
            const store = await User.findOne({ storeName: data.storeName });

     
           

            if (brand && category && subcategory && store) {
                const newProduct=new Product({
                    productName:data.productName,
                    category:category._id,
                    subCategory:subcategory._id,
                    brandId:brand._id,
                    status:true,
                    isActive:true,
                    createdAt:new Date(),
                    createdBy:req.user.userId,
                    storId:store._id,
                    productCost:data.productCost,
                    productPrice:data.productPrice,
                    tax:data.tax,
                    taxMethod:data.taxMethod,
                    productQuantity:data.productQuantity,
                    productDescription:data.productDescription

                })

                

                await newProduct.save();
            }
           
        }

        fs.unlinkSync(req.file.path);
        res.status(201).json({ message: 'Bulk product addition successful' });

    } catch (error) {
       
      console.log(501).json({message:'Internal Server Error'})  
    }
})

router.post('/assign-products', verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'), async (req, res) => {

    console.log("req-->",req.body)
    try {
      const { userId, products } = req.body;
  
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      for (const product of products) {
        const { productId, quantity } = product;
  
        const dbProduct = await Product.findOne({ _id: productId });
  
        if (!dbProduct || dbProduct.productQuantity < quantity) {
          return res.status(400).json({ message: 'Invalid product or insufficient quantity' });
        }
  
        const assignedProduct = {
            productId: dbProduct._id,
            productName: dbProduct.productName,
            quantity: quantity
          };
        
        let existingProductIndex = -1;
      for (let i = 0; i < user.assignedProducts.length; i++) {
    if (user.assignedProducts[i].productId.equals(assignedProduct.productId)) {
            existingProductIndex = i;
    break; // Exit the loop once the index is found
    }
}
 if (existingProductIndex !== -1) {
        const updatedAssignedProducts = [...user.assignedProducts];
       updatedAssignedProducts[existingProductIndex].quantity += assignedProduct.quantity;
      let result= await User.updateOne(
          { _id: userId },
          { $set: { assignedProducts: updatedAssignedProducts } }
        );
      } else {
        let result=await User.updateOne(
          { _id: userId },
          { $push: { assignedProducts: assignedProduct } }
        );
      }
        
    await Product.updateOne(
          { _id: productId },
          { $inc: { productQuantity: -quantity } }
        );
      }
  
      res.status(200).json({ message: 'Products assigned successfully' });
    } catch (error) {
      console.log("error-->", error);
      res.status(500).json({ message: 'Internal server error' });
    }
 });
  
 module.exports = router;

