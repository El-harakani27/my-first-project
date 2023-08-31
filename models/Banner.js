const { text } = require('body-parser');
const mongoose = require('mongoose');
const BannerSchema = new mongoose.Schema({
    imgUrl:String,
    buttonText:String,
    product:String,
    Desc:String,
    smallText:String,
    MidText:String,
    LargeText1:String,
    LargeText2:String,
    Discount:String,
})
module.exports= mongoose.model('Banner',BannerSchema);