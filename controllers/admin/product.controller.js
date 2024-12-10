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
            .skip(pagination.skipItem)
            .sort({createdAt: -1});     //sort by createdAt in descending order

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
        if (!req.body.title) {
            req.flash('error', 'Vui lòng nhập tên sản phẩm');
            returnres.redirect(req.get('Referer') || '/');
        }

        req.body.price = parseInt(req.body.price, 10) || 0;
        req.body.discountPercentage = parseInt(req.body.discountPercentage, 10) || 0;
        req.body.stock = parseInt(req.body.stock, 10) || 1;

        if (req.file && req.file.filename) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        } else {
            req.body.thumbnail = ''; // Default or empty if no file is uploaded
        }

        req.body.category = req.body.category || 'Uncategorized';
        req.body.tags = Array.isArray(req.body.tags) ? req.body.tags : [];
        req.body.delete = false;
        req.body.reviews = [];
        req.body.images = Array.isArray(req.body.images) ? req.body.images : [];
        req.body.rating = 0;

        const product = new Product(req.body);
        await product.save();

        req.flash('success', 'Tạo sản phẩm thành công');
        return res.redirect(`${systemConfig.prefixAdmin}/products`);
    } catch (error) {
        console.error('Error creating product:', error);
        req.flash('error', 'Đã xảy ra lỗi khi tạo sản phẩm. Vui lòng thử lại.');
        return res.status(500).redirect(`${systemConfig.prefixAdmin}/products/create`);
    }
};

// [GET] Edit a product in page
module.exports.edit = async (req, res) => {
    try {
        const find = {
            _id: req.params.id,
            delete: false
        }
        const product = await Product.findOne(find);
        if (!product) {
            req.flash('error', 'Không tìm thấy sản phẩm');
            return res.redirect(req.get('Referer') || '/');
        }
        res.render('admin/pages/products/edit', {
            pageTitle: 'Trang chỉnh sửa sản phẩm',
            product: product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        req.flash('error', 'Đã xảy ra lỗi khi tìm sản phẩm. Vui lòng thử lại.');
        return res.redirect(req.get('Referer') || '/');
    }
}

//[PATCH] Edit a product
module.exports.editPost = async (req, res) => {
    try {
        if (req.file) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }
        if (!req.body.title) {
            req.flash('error', 'Vui lòng nhập tên sản phẩmm');
            return res.redirect(req.get('Referer') || '/');
        }
        req.body.price = parseFloat(req.body.price) || 0;
        req.body.discountPercentage = parseFloat(req.body.discountPercentage) || 0;
        req.body.stock = parseInt(req.body.stock, 10) || 1;
        await Product.updateOne({_id: req.body.id}, req.body);
        req.flash('success', 'Cập nhật sản phẩm thành công');
        return res.redirect(req.get('Referer') || '/');
    } catch (error) {
        console.error('Error creating product:', error);
        req.flash('error', 'Đã xảy ra lỗi khi thay đổi sản phẩm. Vui lòng thử lại.');
        return res.redirect(req.get('Referer') || '/');
    }
}























