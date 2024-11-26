const express = require('express');
const router = express.Router();

const controler = require('../../controllers/admin/product.controller');

//http://localhost:3000/admin/dashboard
router.get('/', controler.index);

//http://localhost:3000/admin/controller/change-status/:id
router.patch('/change-status/:status/:id', controler.changeStatus);//dynamic routing

router.patch('/change-multi', controler.changeMulti);

router.delete('/delete/:id', controler.delete);

module.exports = router;