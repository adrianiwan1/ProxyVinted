const express = require('express')
const router = express.Router()
const { getItems, loginUser, getSingleItem, getRecommendation } = require('../controllers/controller')

/* GET GetItems /getItems */
router.get('/getItems', getItems)

router.get('/item', getSingleItem)

/* POST Login /login */
router.post('/login', loginUser)

router.get('/recommendation', getRecommendation)

module.exports = router
