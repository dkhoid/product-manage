const express = require('express');
const router = express.Router();

const controler = require('../../controllers/admin/product.controller');

router.get('/', controler.index);

router.patch('/change-status/:status/:id', controler.changeStatus);//dynamic routing

router.patch('/change-multi', controler.changeMulti);

router.delete('/delete/:id', controler.delete);

router.get('/create', controler.create);

router.post('/create', controler.createPost);

module.exports = router;