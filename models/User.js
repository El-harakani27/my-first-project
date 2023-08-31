const mongoose = require('mongoose');
const Product = require('./Product')
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    Cart:{
        items:[{
            productId:{
                type:mongoose.Types.ObjectId,
                ref:'Product'
            },
            price:Number,
            quantity:Number

        }],
        totalQty:{type:Number},
        totalPrice:{type:Number}
    }

})


UserSchema.methods.addtoCart = function(product,quantity) {
    if (this.Cart === undefined) {
        this.Cart = { items: [] };
    }

    const getIndexProductCart = this.Cart.items.findIndex((item) => item.productId.toString() === product._id.toString());
    const updateCartItem = [...this.Cart.items];
    const newtotalqty= this.Cart.totalQty+quantity;
    const newtotalprice= this.Cart.totalPrice+(quantity*product.price);
    if (getIndexProductCart >= 0) {
        const newQuantity = this.Cart.items[getIndexProductCart].quantity + quantity;

        this.Cart.items[getIndexProductCart].quantity = newQuantity;
        this.Cart.items[getIndexProductCart].price = product.price;
    } else {
        updateCartItem.push({
            productId: product._id,
            price:product.price,
            quantity: quantity,
        });

    }

    const updateCart = {
        items: updateCartItem,
        totalQty: newtotalqty,
        totalPrice:newtotalprice
    };

    this.Cart = updateCart;
    return this.save();
};
UserSchema.methods.removeFromCart = function(product){
    const founditem = this.Cart.items.find((item)=>item.productId.toString() === product._id.toString());
    
    const updatedCart = this.Cart.items.filter(item => item.productId.toString() !== product._id.toString());
    

     
   this.Cart.totalPrice=this.Cart.totalPrice-(founditem.price*founditem.quantity);    
    this.Cart.items = updatedCart;
    this.Cart.totalQty = this.Cart.totalQty-founditem.quantity;
    return this.save();
    
    }
UserSchema.methods.updateQty = function(id,val){
    const founditemIndex = this.Cart.items.findIndex((item)=> item._id.toString() === id.toString());
    console.log(founditemIndex)
    console.log(this.Cart.items[founditemIndex])
    if (val==='inc'){
    this.Cart.items[founditemIndex].quantity = this.Cart.items[founditemIndex].quantity+1;
    this.Cart.totalQty = this.Cart.totalQty+1;
    this.Cart.totalPrice = this.Cart.totalPrice+this.Cart.items[founditemIndex].price;
    }
    else if(val==='dec' && this.Cart.items[founditemIndex].quantity>1){
        this.Cart.items[founditemIndex].quantity = this.Cart.items[founditemIndex].quantity-1;
        this.Cart.totalQty = this.Cart.totalQty-1;
        this.Cart.totalPrice = this.Cart.totalPrice-this.Cart.items[founditemIndex].price;
    }
    return this.save();
}



module.exports = mongoose.model('user',UserSchema);
