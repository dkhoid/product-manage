const express = require('express');
const router = express.Router();

const controler = require('../../controllers/admin/product.controller');

router.get('/', controler.index);  //http://localhost:3000/admin/controller

module.exports = router;