const { getAllItems } = require('../services/getAllItemsUseCase.js');

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
    
    res.send('logged in');
}

module.exports = {getItems, loginUser}