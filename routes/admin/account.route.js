const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/account.controller');
const validateAccount = require('../../middlewares/admin/validate-account');
const { authentication } = require('../../middlewares');

router.get('/', controller.index);

router.get('/register', controller.register);

router.post('/register', validateAccount, controller.registerPost);

module.exports = router;
