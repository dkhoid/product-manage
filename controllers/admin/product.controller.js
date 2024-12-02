const Product = require('../../models/product.model');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
const systemConfig = require('../../config/system');

// [GET] /admin/products
module.exports.index = async (req, res) => {
    try {
        let filter = {delete: false};

        // Apply status filter
        const filterStatus = filterStatusHelper(req.query);
        if (req.query.status) {
            filter.status = req.query.status;
        }

        // Apply search filter
        const objectSearch = searchHelper(req.query);
        if (objectSearch.regex) {
            filter.title = objectSearch.regex;
        }

        // Pagination setup
        const countProducts = await Product.countDocuments(filter);
        const paginationOptions = {
            limitItem: 10, currentPage: 1, countProducts
        };
        const pagination = paginationHelper(paginationOptions, req.query);

        // Fetch products with applied filters and pagination
        const products = await Product.find(filter)
            .limit(pagination.limitItem)
            .skip(pagination.skipItem);

        // Render products page
        res.render('admin/pages/products/index', {
            pageTitle: 'Trang quản lý sản phẩm',
            products,
            filterStatus,
            keyword: objectSearch.keyword,
            Pagination: pagination
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
};

// [PATCH] Change product status
module.exports.changeStatus = async (req, res) => {
    try {
        const {id, status} = req.params;
        await Product.updateOne({_id: id}, {status});
        req.flash('success', 'Cập nhật trạng thái sản phẩm thành công');
        res.redirect(req.get('Referer') || '/');
    } catch (error) {
        console.error('Error changing product status:', error);
        res.status(500).send('Internal Server Error');
    }
};

// [POST] Change multiple products
module.exports.changeMulti = async (req, res) => {
    try {
        const {type, ids} = req.body;
        const idArray = ids.split(',');

        const updates = {
            Active: {status: 'Active'},
            Inactive: {status: 'Inactive'},
            'Delete-all': {delete: true, deleteAt: new Date()}
        };

        if (updates[type]) {
            await Product.updateMany({_id: {$in: idArray}}, updates[type]);
        }
        req.flash('success', 'Cập nhật trạng thái sản phẩm thành công');
        res.redirect(req.get('Referer') || '/');
    } catch (error) {
        console.error('Error changing multiple products:', error);
        res.status(500).send('Internal Server Error');
    }
};

// [DELETE] Delete a product
module.exports.delete = async (req, res) => {
    try {
        const {id} = req.params;
        await Product.updateOne({_id: id}, {delete: true, deleteAt: new Date()});
        req.flash('success', 'Xóa sản phẩm thành công');
        res.redirect(req.get('Referer') || '/');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
};

// [GET] Create a product
module.exports.create = (req, res) => {
    res.render('admin/pages/products/create', {
        pageTitle: 'Trang tạo sản phẩm'
    });
}

// [POST] Create a product
module.exports.createPost = async (req, res) => {
    try {
        //actully, we don't need to initialize the value of missing fields,  because we can (now is not) default value in the schema
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        req.body.category = req.body.category || 'Uncategorized';
        req.body.tags = req.body.tag || [];
        req.body.delete = false;
        req.body.reviews = [];
        req.body.images = req.body.images || [];
        req.body.rating = 0;
        const product = new Product(req.body);
        await product.save();
        req.flash('success', 'Tạo sản phẩm thành công');
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Internal Server Error');
    }

}


























