const express = require('express');
const router = express.Router();
const controller_product = require('../controllers/products');
router.get('/',controller_product.getBanner);
router.post('/banner',controller_product.PostBanner);
router.get('/products',controller_product.getProducts);
router.post('/postproducts',controller_product.PostProducts);
router.get('/product/:prodid',controller_product.getProduct);
module.exports = router;