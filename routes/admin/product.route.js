const express = require('express');
const router = express.Router();
const storageMulter = require('../../helpers/storageMulter');
const multer = require('multer');
const upload = multer({storage: storageMulter()});

const controller = require('../../controllers/admin/product.controller');

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);//dynamic routing

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.delete);

router.get('/create', controller.create);

router.post('/create', upload.single('thumbnail'), controller.createPost);
module.exports = router;