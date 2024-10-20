const mongoose = require('mongoose');

module.exports.connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connect to DB success');
    } catch (error) {
        console.log('Connect to DB fail');
    }
}
