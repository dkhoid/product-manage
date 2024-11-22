// Use: This file is used to paginate the data
const {parse} = require("dotenv");
module.exports = (objectPagination, query) => {

    objectPagination.totalPage = Math.ceil(objectPagination.countProducts / objectPagination.limitItem);
    if (query.page) {
        let page = parseInt(query.page);
        if (page < 1 || isNaN(page) || page > objectPagination.totalPage) {
            objectPagination.currentPage = 1;
        } else {
            objectPagination.currentPage = page
        }
    }
    objectPagination.skipItem = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    return objectPagination;
}