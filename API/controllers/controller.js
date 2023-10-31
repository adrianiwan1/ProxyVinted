const { getAllItems } = require('../services/getAllItemsUseCase.js')
const { getItem } = require('../services/getSingleItmeUseCase.js')
const { login } = require('../services/loginUserUseCase.js')
const { getUserRecommendation } = require('../services/recommendationCase.js')
const { banUser } = require('../services/banUserUseCase.js')
const { getUsers } = require('../services/getAllUsersUseCase.js') 

async function getItems (req, res, next) {
  console.log('getItems endpoint requested')

  let response
  try {
    response = await getAllItems(req.query)
  } catch (err) {
    res.status(400).send(err.message)
  }
  res.send(response)
}

// Wylogowanie: res.clearCookie("userID") res.send("Zostałeś wylogowany");
function isLoggedIn(req, res, next) {
  console.log(req.sessionID)
  if(req.session.userSession)
    res.send({isLoggedIn: true, user: req.session.userSession})
  else{
    req.session.destroy((err) => {
      if (err) throw err
      res.clearCookie("userSession")
      res.send({isLoggedIn: false})
    })

  }
}

async function loginUser(req, res, next) {
  console.log('loginUser endpoint requested');
  let response;

  try {
    response = await login(req.body)
    req.session.userSession = response
    console.log(response)
  } catch (err) {
    return res.status(400).send(err.message)
  }
  console.log(req.sessionID)
  res.send(response);
}

function logout(req, res, next) {
  req.session.destroy((err) => {
    if (err) throw err
    res.clearCookie("userSession")
    res.send("Zostałeś wylogowany")
})
}

async function getSingleItem (req, res, next) {
  console.log('getSingleItem endpoint requested')

  let response
  try {
    response = await getItem(req.query)
  } catch (err) {
    res.status(400).send(err.message)
  }
  
  res.send(response)
}

async function getRecommendation (req, res, next) {
  console.log('getRecommendation endpoint requested')
  
  let response
  try {
    response = await getUserRecommendation(req.query)
  } catch (err) {
    res.status(400).send(err.message)
  }

  res.send(response)
}

async function banSelectedUser(req, res, next) {
  console.log('banSelectedUser endpoint requested')

  let response
  try {
    response = await banUser(req.body.userId)
  } catch (err) {
    res.status(400).send(err.message)
  }

  res.send(response)
}

async function getAllUsers(req, res, next) {
  console.log('getAllUsers endpoint requested')

  let response
  try {
    response = await getUsers()
  } catch (err) {
    res.status(400).send(err.message)
  }

  res.send(response)
}
module.exports = { getItems, loginUser, getSingleItem, getRecommendation, 
                    banSelectedUser, getAllUsers, isLoggedIn, logout }
