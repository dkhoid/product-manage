const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong. Please try again later.',
        message: err.message
    });
};

module.exports = errorHandler;
