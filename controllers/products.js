const Banner = require('../models/Banner');
const Product = require('../models/Product');
exports.getBanner = (req,res,next)=>{
    Banner.find().then(banner =>{
        res.json({'message':"success",'banner':banner})
    })
    
}
exports.PostBanner = (req,res,next)=>{
    const banner = new Banner({
        imgUrl:'images/earphones_a_1.webp',
        buttonText:'Shop Now',
        product:'headphones',
        Desc:'Best headphones on the market',
        smallText:'Beat solo',
        MidText:'Summer Sale',
        LargeText1:'Fine',
        LargeText2:'SMILE',
        Discount:'20%'
    })
    banner.save()
    res.json({'message':"success","name_product":banner})
}

exports.getProducts = (req,res,next)=>{
    Product.find().then(products=>{
        res.json({'message':"products found",'products':products})
    })
}
exports.PostProducts = (req,res,next)=>{
    const product = new Product({
        imgUrl:['images/watch_1.webp','images/watch_2.webp','images/watch_3.webp','images/watch_4.webp'],
        name:'watch',
        price:200,
        details:"small and accurate"
    })
    product.save()
    res.json({'message':"success","product":product})
}
exports.getProduct = (req,res,next)=>{
    const prodid = req.params.prodid
    Product.findById(prodid).then(product=>{
        res.json({message:"product found",product:product})
    }) 
}