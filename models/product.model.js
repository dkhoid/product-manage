const mongoose = require("mongoose");

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    images: [String],
    thumbnail: String,
    reviews: {
        type: Map,
        of: new mongoose.Schema({
            rating: Number,
            comment: String,
            date: Date,
            reviewerName: String
        }),
    },
    slug: { type: String, slug: "title", slugPaddingSize: 4, unique: true },
    status: String,
    delete: Boolean,
    deletedAt: Date
}, {timestamps: true});
const Product = mongoose.model('Product', productsSchema, 'Products_data');



module.exports = Product;

















