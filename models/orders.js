const mongoose = require('mongoose');

const orderschema=new mongoose.Schema({
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products:[{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    orderDate:{type:Date,required:true},

})

const Order=mongoose.model('Order',orderschema)


module.exports = Order