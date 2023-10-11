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

module.exports = {getItems}