const express = require('express');
const router = express.Router();
const { getItems, loginUser, getSingleItem } = require('../controllers/controller');

/* GET GetItems /getItems */
router.get('/getItems', getItems);

router.get('/item/:itemId', getSingleItem);

/* POST Login /login */
router.post('/login', loginUser);

module.exports = router;
