const express = require('express')
const router = express.Router()
const { logout, isLoggedIn, getItems, loginUser, getSingleItem, getRecommendation, banSelectedUser, getAllUsers } = require('../controllers/controller')

/* GET GetItems /getItems */
router.get('/getItems', getItems)

router.get('/item', getSingleItem)

/* POST Login /login */
router.post('/login', loginUser)

router.get('/isLoggedIn', isLoggedIn)

router.get('/logout', logout)

router.get('/recommendation', getRecommendation)

router.get('/getUsers', getAllUsers)

router.put('/banUser', banSelectedUser)

module.exports = router
