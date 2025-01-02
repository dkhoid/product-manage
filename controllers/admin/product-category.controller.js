const ProductCategory = require('../../models/productCategory.model');
const Product = require('../../models/product.model');

module.exports.index = async (req, res) => {
    try {
        // Aggregation query to get categoryName and the count of products for each category
        const categoryCounts = await ProductCategory.aggregate([
            { $group: { _id: '$categoryName', productCount: { $sum: 1 } } },
            {
                $project: {
                    categoryName: '$_id',  // Rename _id to categoryName
                    productCount: 1,  // Keep productCount
                    _id: 0  // Remove _id from the result
                }
            },
            { $sort: { categoryName: 1 } } // Sort by categoryName (ascending order)
        ]);


        // Render the page with category counts
        res.render('admin/pages/product-category/index', {
            pageTitle: 'Trang quản lý danh mục',
            categories: categoryCounts
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.create = async (req, res) => {
    try {
        res.render('admin/pages/product-category/create', {
            pageTitle: 'Trang quản lý danh mục',
        });
    } catch (error) {
        console.error('Error fetching products category:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports.createPost = async (req, res) => {
    try {
        const {categoryName} = req.body;
        const newCategory = new ProductCategory({
            categoryName: categoryName,
        });
        await newCategory.save();
        res.redirect('/admin/product-category');
    } catch (error) {
        console.error('Error creating product category:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports.edit = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await ProductCategory.findById(id);
        res.render('admin/pages/product-category/edit', {
            pageTitle: 'Trang quản lý danh mục',
            category: category
        });
    } catch (error) {
        console.error('Error fetching product category:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports.editPost = async (req, res) => {
}

module.exports.delete = async (req, res) => {
    try {
        const { categoryName } = req.params;

        // Ensure category exists before deleting
        const category = await ProductCategory.findOne({ categoryName: categoryName });
        if (!category) {
            return res.status(404).send('Category not found');
        }

        // Proceed to delete
        await ProductCategory.deleteOne({ categoryName: categoryName });

        // Return a success response
        res.status(200).send('Category deleted successfully');
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.detail = async (req, res) => {
    try {
        const {categoryName} = req.params;
        const category = await ProductCategory.find({categoryName: categoryName});
        const productIds = category.map((item) => item.product_id);
        const products = await Product.find({ _id: { $in: productIds } });
        res.render('admin/pages/product-category/detail', {
            pageTitle: 'Trang quản lý danh mục',
            products: products,
            categoryName: categoryName
        });
    } catch (error) {
        console.error('Error fetching product category:', error);
        res.status(500).send('Internal Server Error');
    }
}