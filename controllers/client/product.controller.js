const Product = require('../../models/product.model');

//{get} /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        delete: false,
        status:"Active"
    });
    res.render('client/pages/products/index', {
        title: 'Sản phẩm',
        products: products
    });
};

module.exports.detail = async (req, res) => {
    try{
        const slug = req.params.slug;
        const product = await Product.findOne({
            slug: slug,
            delete: false,
            status:'Active'
        });
        console.log(product)
        res.render('client/pages/products/detail', {
            title: 'Sản phẩm',
            product: product
        });
    }
    catch(err){
        console.log(err);
        res.redirect('/products');
    }
}
