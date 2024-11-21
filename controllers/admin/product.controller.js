const Product = require('../../models/product.model');
const filterStatusHelper = require('../../helpers/filterStatus');
//{get} /admin/products
module.exports.index = async (req, res) => {
    let find = {
        delete: false
    }
    const filterStatus = filterStatusHelper(req.query);

    let keyword = '';
    if (req.query.keyword) {
        keyword = req.query.keyword;
        find.title = new RegExp(keyword, 'i');
    }
    const products = await Product.find(find);
    res.render('admin/pages/products/index', {
        pageTitle: 'Trang quản lý sản phẩm',
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
}