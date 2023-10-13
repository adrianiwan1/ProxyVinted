const { getAllItems } = require('../services/getAllItemsUseCase.js');
const { login } = require('../services/loginUserUseCase.js');

async function getItems(req, res, next){
    console.log('getItems endpoint requested');
    let response;
    try{
        response = await getAllItems(req.query);
    }catch(err){
        console.log(err);
    }
    res.send(response);
}

async function loginUser(req, res, next){
    console.log('loginUser endpoint requested');
    
    let response = await login(req.body);
    res.send(response);
}

module.exports = {getItems, loginUser}