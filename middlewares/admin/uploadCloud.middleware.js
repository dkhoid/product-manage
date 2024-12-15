const cloudinary = require("../../config/cloudinary.config");
module.exports = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body[req.file.fieldname] = result.secure_url;
        console.log(req.body[req.file.fieldname]);
        next();
    } catch (error) {
        console.error('Error uploading file to cloud:', error);
        res.status(500).send('Internal Server Error');
    }
}//In this middleware, we use the cloudinary.config.js file to upload files to Cloudinary.

//I can use the cloudinaryStorage method from the multer-storage-cloudinary package to upload files to Cloudinary,
// but it is not recommended because it is not as flexible as the cloudinary.config.js file.