const Product = require('../../models/product.model');

//{get} /admin/products
module.exports.index = async (req, res) => {
    let filterStatus = [
        {
            name: 'Tất cả',
            status: '',
            class: 'active'
        },
        {
            name: 'Hoạt động',
            status: 'Active',
            class: ''
        },
        {
            name: 'Ngừng hoạt động',
            status: 'Inactive',
            class: ''
        }
    ]
    if(req.query.status){
        filterStatus.forEach(status=>{
            if(status.status === req.query.status){
                status.class = 'active';
            }
            else {
                status.class = '';
            }
        });
    }

    let find = {
        delete: false
    }
    if(req.query.status){
        find.status = req.query.status;
    }
    const products = await
        Product.find(find);
    res.render('admin/pages/products/index', {
        pageTitle: 'Trang quản lý sản phẩm',
        products: products,
        filterStatus:filterStatus
    });
}