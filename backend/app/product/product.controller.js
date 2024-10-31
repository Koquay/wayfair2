const productService = require('./product.service');

exports.getProducts = (req, res) => {
    productService.getProducts(req, res);
}