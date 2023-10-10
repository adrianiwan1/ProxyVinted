const express = require('express');
const router = express.Router();
const { getItems } = require('../controllers/controller');

/* GET GetItems /getItems */
router.get('/getItems', getItems);

module.exports = router;
