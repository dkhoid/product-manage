const ProductCategory = require('../../models/productCategory.model');

module.exports.index = async (req, res) => {
    try {
        let filter = {};
        const categories = await ProductCategory.find(filter);
        res.render('admin/pages/product-category/index', {
            pageTitle: 'Trang quản lý danh mục',
            categories:categories
        });
    } catch (error) {
        console.error('Error loading products category:', error);
        res.status(500).send('Internal Server Error');
    }
};
module.exports.create = async (req, res) => {
    try {
        res.render('admin/pages/product-category/create', {
            pageTitle: 'Trang quản lý danh mục',
        });
    } catch (error) {
        console.error('Error fetching products category:', error);
        res.status(500).send('Internal Server Error');
    }
}