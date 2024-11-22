const express = require('express');
const router = express.Router();

const controler = require('../../controllers/admin/product.controller');

//http://localhost:3000/admin/controller
router.get('/', controler.index);

//http://localhost:3000/admin/controller/change-status/:id
router.patch('/change-status/:status/:id', controler.changeStatus);//dynamic routing

module.exports = router;