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
        limitItem: 10,
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
    else if(type==='Inactive'){
        await Product.updateMany({_id: {$in: ids}}, {status: 'Inactive'});
    }
    else if(type==='Delete-all'){
        await Product.updateMany({_id: {$in: ids}}, {delete: true, deleteAt: new Date()});
    }

    res.redirect(req.get("Referer") || "/");
}

module.exports.delete = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne(
        {_id: id},
        {delete: true, deleteAt: new Date()}
    );
    res.redirect(req.get("Referer") || "/");
}







/*
different way to access data from the http request in Express.js

(*)req.params: This property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /user/:name, then the “name” property is available as req.params.name. This object defaults to {}.
(*)req.query: This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.
(*)req.body: This property is an object containing the parsed request body. This feature is provided by the bodyParser() middleware, though other body parsing middleware may follow this convention as well. This property defaults to {} when bodyParser() is used.
req.cookies: This property is an object that contains cookies sent by the request. If the request contains no cookies, it defaults to {}.
req.headers: This property is an object containing the headers of the request. The headers object is keyed by the header field names (in lowercase), and the values are the respective header values.
req.path: This property contains the path part of the request URL.
req.protocol: This property is the request protocol string, either http or (for TLS/SSL requests) https.
req.secure: This property is a Boolean value that is true if a TLS connection is established.
...

*/




