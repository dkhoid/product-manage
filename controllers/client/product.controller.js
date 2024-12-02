const Product = require('../../models/product.model');

//{get} /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: 'Active',
        delete: false
    });
    res.render('client/pages/products/index', {
        title: 'Sản phẩm',
        products: products
    });
};