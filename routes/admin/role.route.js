const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/role.controller');

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', controller.createPost);
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', controller.editPost);
router.delete('/delete/:id', controller.delete);
router.get('/detail/:id', controller.detail);
router.get('/permissions', controller.permissions);
module.exports = router;
