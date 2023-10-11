const express = require('express');
const router = express.Router();
const { getItems, loginUser } = require('../controllers/controller');

/* GET GetItems /getItems */
router.get('/getItems', getItems);

/* POST Login /login */
router.post('/login', loginUser);

module.exports = router;
