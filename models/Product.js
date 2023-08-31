const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    imgUrl:[String],
    name:String,
    price:Number,
    details:String

})
module.exports = mongoose.model('Product',ProductSchema);