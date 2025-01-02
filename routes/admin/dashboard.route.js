const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/dashboard.controller');

router.get('/', controller.dashboard);  //http://localhost:3000/admin/dashboard

module.exports = router;