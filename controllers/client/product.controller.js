const Product = require('../../models/product.model');

//{get} /products
module.exports.index = async (req, res) => {
    try {
        const products = await Product.find({});
        const newProduct = products.map(item =>{
            item.priceNew = item.price - item.price * item.discountPercentage / 100;
            item.priceNew = item.priceNew.toFixed(2);
            return item;
        });
        res.render('client/pages/products/index', {
            title: 'Sản phẩm',
            products: products
        });
        //render ra file index.pug trong thư mục views/client/pages/products

    } catch (error) {
        res.status(500).send('Internal Server Error!!');
    }
};