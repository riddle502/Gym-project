const express = require('express');
const UserRoutes = require('./routes/usersRoutes');
const productRoutes=require('./routes/productRoutes')
const commonRoutes=require('./routes/commonRoutes')
const stateRoute=require('./routes/stateRoutes')
const cityRoute=require('./routes/cityRoutes')
const authenticationRoutes=require('./routes/authenticationRoutes')
const productsellRoute=require('./routes/productSellRoute')
const StoreRoute=require('./routes/storRoutes')
const userType=require('./routes/userTypeRoute')
const categoryRoute=require('./routes/categoryRoute')
const brandRoute=require('./routes/BrandsRoute')
const subCategoryRoute=require('./routes/subCategoryRoutes')
const ourderRoute=require('./routes/orderRoute')
const router = express.Router();

router.use('/user', UserRoutes);

router.use('/product', productRoutes);

router.use('/common',commonRoutes)

router.use('/state',stateRoute)

router.use('/city',cityRoute)

router.use('/login',authenticationRoutes)

router.use('/sell',productsellRoute)

router.use('/store',StoreRoute)

router.use('/userType',userType)
router.use('/Category',categoryRoute)
router.use('/Brand',brandRoute)
router.use('/subCategory',subCategoryRoute)
router.use('/order',ourderRoute)

module.exports = router;

