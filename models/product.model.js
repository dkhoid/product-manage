const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    availabilityStatus: String,
    images: [String],
    thumbnail: String,
    reviews: {
        type: Map,
        of: new mongoose.Schema({
            rating: Number,
            comment: String
        })
    },
    status: String,
    delete: Boolean
});
const Product = mongoose.model('Product', productsSchema, 'Products_data');

module.exports = Product;