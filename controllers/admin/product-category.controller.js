
module.exports.index = async (req, res) => {
    try {
        res.render('admin/pages/product-category/index', {
            pageTitle: 'Trang sản phẩm',
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
};
module.exports.create = async (req, res) => {
    try {
        res.render('admin/pages/product-category/create', {
            pageTitle: 'Tạo sản phẩm',
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports.createPost = async (req, res) => {
    try {
        res.send('Create product category successfully');
    } catch (error) {
        console.error('Error creating product category:', error);
        }
}
