const Product = require('../../models/product.model');

//{get} /products
module.exports.index = async (req, res) => {
    try {
        const products = await Product.find({
            status: 'Active',
            isDeleted: false
        }).lean();

        const newProduct = products.map(item => ({
            ...item, // Create a copy of the original item
            newPrice: (item.price - item.price * item.discountPercentage / 100).toFixed(2)
        }));

        res.render('client/pages/products/index', {
            title: 'Sản phẩm',
            products: newProduct
        });
        //render ra file index.pug trong thư mục views/client/pages/products

    } catch (error) {
        res.status(500).send('Internal Server Error!!');
    }
};