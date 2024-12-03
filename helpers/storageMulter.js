// Used for storing the uploaded files in the public/uploads folder
module.exports = () =>{
    const multer = require('multer');
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    });
}