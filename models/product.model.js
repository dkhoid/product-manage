const productsSchema = new mongoose.Schema({
    title: String,description: String,
    price: Number,discountPercentage: Number,
    rating: Number,stock: Number,brand: String,
    category: String,thumbnail: String,
    images: [String]

});
const Product = mongoose.model('Product', productsSchema, 'products');
module.exports = Product;