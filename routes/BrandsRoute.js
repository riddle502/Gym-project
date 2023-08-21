const express=require('express')
const router = express.Router();
const multer = require('multer');
const Brand =require('../models/Brands')
const verifyTokenMiddleware = require('../jwtmiddleware');
// const createUploadMiddleware = require('../fileUpload');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/logos/'); 
    },
    filename: function (req, file, cb) {
      const originalName = file.originalname;
      const extension = originalName.split('.').pop();
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'logo-' + uniqueSuffix + '.' + extension);
    },
  });

const upload = multer({ storage: storage });

// const logoImageUpload = createUploadMiddleware('logo');

router.post('/', upload.single('logo'),verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async (req, res) => {
    const{brandname}=req.body
    const logoUrl = req.file ? req.file.path : null;

    try {
        const newBrand=new Brand({
            brandname,
            status:true,
            createdAt:new Date(),
            createdBy:req.user.userId,
            isActive:true,
            logo:logoUrl
        })
        await newBrand.save();
        res.status(201).json({ message: 'Brand added successfully', brand: newBrand });
    } catch (error) {
        console.error('Error adding brand:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

router.post('/getbrands',verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    try {
      const { brandIds } = req.body;
      const allBrands = await Brand.find({ _id: { $in: brandIds } });
     // const allBrands=await Brand.find()
      if(!allBrands){
        res.status(400).json({message:'no brand found'})
      }
      res.status(200).json({message:'brands fetched',data:allBrands})

    } catch (error) {
      console.error('Error adding Product:', error);
      res.status(500).json({ message: 'Internal server error' });  
    }
})
           
router.patch('/:id',upload.single('logo'),verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req, res) => {
    const brandId=req.params.id
    const updateData=req.body
    try {
      if(req.file){
        updateData.logo=req.file.path
      }
      updateData.updatedAt=new Date()
      updateData.updatedBy=req.userId
      const brand =await Brand.findByIdAndUpdate(brandId,{$set:updateData},{new:true})
      if(!brand){
        res.status(401).json({message:'no brand found'})
      }
      res.status(201).json({message:'record updated',brand:brand})
      
    } catch (error) {
      console.log("error--->",error)
      res.status(500).json({message:'Internal server error '})
    }
}) 

router.post('/search',verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{
    const {brandname}=req.body

    try {
      const searchCriteria={}
      searchCriteria.brandname=brandname

      const foundbrands= await Brand.find(searchCriteria)
      if(!foundbrands){
        res.status(401).json({message:'no brand found'})
      }
      res.status(201).json({message:'brand fetched',brands:foundbrands})
    } catch (error) {
      console.log("error-->",error)
      res.status(500).json({message:'Internal server error'})
    }
  
 
})

router.post('/delete/:id',verifyTokenMiddleware('64ca0e04d16b3ceb880ee215'),async(req,res)=>{

  const {id}=req.params
 
  try {
      // console.log("Id--->",id)
      const doc = await Brand.findById(id);
      
  if (!doc)
   {
      return res.status(404).json({ error: 'Document not found' });
  }
    doc.isActive = false;
    await doc.save();
    return res.status(200).json({ message: 'record has been deleted' });
  }catch (error) {
      console.log('eroor-->',error)
      res.status(500).json({message:'internal server error'})
  }

})
  

module.exports=router