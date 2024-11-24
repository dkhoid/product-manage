const Product = require('../../models/product.model');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');

//{get} /admin/products
module.exports.index = async (req, res) => {
    let find = {delete: false}

    //find all products
    const filterStatus = filterStatusHelper(req.query);
    if (req.query.status) {
        find.status = req.query.status;
    }

    //search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    //pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = {
        limitItem: 8,
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


module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;

    await Product.updateOne({_id: id}, {status: status});
    res.redirect(req.get("Referer") || "/");

}

module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(',');
    if(type==='Active'){
        await Product.updateMany({_id: {$in: ids}}, {status: 'Active'});
    }
    else{
        await Product.updateMany({_id: {$in: ids}}, {status: 'Inactive'});
    }

    res.redirect(req.get("Referer") || "/");

}