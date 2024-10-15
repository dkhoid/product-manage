const productsRoutes = require('./product.route');
const homeRoutes = require('./home.route');


module.exports = (app) => {
    app.use('/products', productsRoutes);
    app.use('/', homeRoutes);
};
