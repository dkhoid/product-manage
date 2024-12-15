const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route');
const productCategory = require('./product-category.route')
const systemconfig = require('../../config/system');


module.exports = (app) => {
    const PATH_ADMIN = systemconfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);
    app.use(PATH_ADMIN + '/products', productRoutes);
    app.use(PATH_ADMIN + '/product-category', productCategory)
};
