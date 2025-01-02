const express = require('express');
const router = express.Router();
const storageMulter = require('../../helpers/storageMulter');
const multer = require('multer');
const upload = multer({storage: storageMulter()});

const controller = require('../../controllers/admin/product-category.controller');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.createPost);

router.get('/edit/:id', controller.edit);

router.get('/detail/:categoryName', controller.detail);

router.delete('/delete/:categoryName', controller.delete);

module.exports = router;