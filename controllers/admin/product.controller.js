const Product = require('../../models/product.model');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');

//{get} /admin/products
module.exports.index = async (req, res) => {
    //find all products
    let find = {delete: false}
    const filterStatus = filterStatusHelper(req.query);

    //search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    //pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = {
        limitItem: 16,
        currentPage: 1,
        countProducts: countProducts
    }
    objectPagination = paginationHelper(objectPagination, req.query);

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skipItem);
    res.render('admin/pages/products/index', {
        pageTitle: 'Trang quản lý sản phẩm',
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        Pagination: objectPagination
    });
}


