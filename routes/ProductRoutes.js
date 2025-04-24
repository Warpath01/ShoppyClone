const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.index);
router.get('/products/new', productController.newForm);
router.post('/products', productController.create);
router.get('/products/:id/edit', productController.editForm);
router.post('/products/:id', productController.update);

module.exports = router;