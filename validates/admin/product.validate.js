module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash('error', 'Vui lòng nhập tên sản phẩm');
    }
    next(); // Proceed to the next middleware or controller
};
