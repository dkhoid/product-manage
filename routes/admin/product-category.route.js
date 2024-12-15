const express = require('express');
const router = express.Router();
const storageMulter = require('../../helpers/storageMulter');
const multer = require('multer');
const upload = multer({storage: storageMulter()});

const controller = require('../../controllers/admin/product-category.controller');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single('thumbnail'), controller.createPost);

module.exports = router;