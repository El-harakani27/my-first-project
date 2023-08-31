const User = require('../models/User');
const Product =require('../models/Product');
exports.getusers = (req,res,next)=>{
    User.find().then((users)=>{
        res.json({'message':'users found','users':users});
    })
}
exports.Postuser = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user = new User({
        email: email,
        password: password
    })
    user.save();
    res.json({'message':'user saved','user':user}); 
}
exports.PostCart = (req,res,next)=>{
    const prodId = req.params.prodId;
    const quantity = req.body.quantity;
    Product.findById(prodId).then(product=>{
        req.user.addtoCart(product,quantity);
        res.json({'message':'product added to cart','cart':req.user.Cart});
    });
}
exports.DeleteCart = (req,res,next)=>{
    const prodId = req.params.prodId;

    Product.findById(prodId).then(product=>{
        req.user.removeFromCart(product)
        res.json({'message':'product deleted from cart','cart':req.user.Cart})  
    })
    
}
exports.getCart = (req,res,next)=>{
    req.user.populate('Cart.items.productId').then(user=>{
        res.json({'message':'found cart items', 'cart':user.Cart}) 
    })
}
exports.updateqty = (req,res,next)=>{
    const ItemId = req.params.ItemId;
    const value = req.body.value;
     req.user.updateQty(ItemId,value).then(result=>{console.log(result)})
}