const express = require('express')
const BodyParser = require('body-parser')
const productroute = require('./routes/products');
const userCartroute = require('./routes/users');
const User = require('./models/User');
const path = require('path');
const mongoose = require('mongoose');
const app = express()
app.use(BodyParser.json());
app.use('/images',express.static(path.join(__dirname,'images')))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
})
app.use((req,res,next)=>{
User.findById("64ed84d4f7fc34116f1345ff").then(user=>{
    req.user = user;
    
    next();
})
.catch(err=>{console.log(err)});
})
app.use(productroute);
app.use(userCartroute);
mongoose.connect('mongodb://127.0.0.1:27017/dummyDB')
.then(result=>{
    app.listen(8080,()=>{
    console.log('listening on');
});
})
.catch(err=>{
    console.log(err);
});