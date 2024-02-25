const express = require('express');
const router = express.Router();

const otherController = require('../controllers/other');

router.get('/', otherController.createProduct)



module.exports = router;