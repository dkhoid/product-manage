const express = require('express');
const router = express.Router();

const controler = require('../../controllers/admin/dashboard.controller');

router.get('/', controler.dashboard);  //http://localhost:3000/admin/dashboard

module.exports = router;