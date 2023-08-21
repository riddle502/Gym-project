const express=require('express')
const Product=require('../models/product')
const Sale=require('../models/sales')
const router = express.Router();

router.post('/', async (req, res) => {
try {
    const productsToSell = req.body.products;
   
    if (!Array.isArray(productsToSell) || productsToSell.length === 0) {
           return res.status(400).json({ message: 'Invalid request data' });
   }
   const soldProducts = [];
   
   for (const item of productsToSell){
       const productId = item.productId;
       const quantityToSell = item.quantity;
   
       const product = await Product.findOne({ _id: productId })
       
       if (!product) {
        return res.status(404).json({ message: `Product with ID ${productId} not found` });
      }

      if (product.productQuantity < quantityToSell) {
        return res.status(400).json({ message: `Not enough quantity available for product with ID ${productId}` });
      }

      product.productQuantity -= quantityToSell;
      soldProducts.push({
        productId:product._id,
        productName:product.productName,
        category:product.category,
        productCost:product.productCost,
        productPrice:product.productPrice,
        tax:product.tax,
        taxMethod:product.taxMethod,
        saleQuantity:item.quantity,
        productDescription:product.productDescription
      })

     await product.save();

   
      
   

   }

   const salesRecords = [];


   for (const soldProduct of soldProducts){
    const saleRecord =new Sale({
        productId:soldProduct.productId,
        productName:soldProduct.productName,
        category:soldProduct.category,
        productCost:soldProduct.productCost,
        productPrice:soldProduct.productPrice,
        tax:soldProduct.tax,
        taxMethod:soldProduct.taxMethod,
        saleQuantity:soldProduct.saleQuantity,
        productDescription:soldProduct.productDescription
    })

      const savedSaleRecord=await saleRecord.save()

  salesRecords.push(savedSaleRecord)
  }



  res.json({ message: 'Products sold successfully', soldProducts, salesRecords });
    
} catch (error) {

    console.log("error-->",error)
    res.status(500).json({ message: 'Internal server error' });
    
}
    


})
module.exports = router;
