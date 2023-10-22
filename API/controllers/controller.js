const { getAllItems } = require('../services/getAllItemsUseCase.js');
const { getItem } = require('../services/getSingleItmeUseCase.js');
const { login } = require('../services/loginUserUseCase.js');
const { getUserRecommendation } = require('../services/recommendationCase.js');

async function getItems(req, res, next){
    console.log('getItems endpoint requested');

    let response;
    try{
        response = await getAllItems(req.query);
    }catch(err){
        res.status(400).send(err.message);
    }
    
    res.send(response);
}

async function loginUser(req, res, next){
    console.log('loginUser endpoint requested');
    let response;

    try{
        response = await login(req.body);
    }catch(err){
        return res.status(400).send(err.message);
    }

    res.send(response);
}

async function getSingleItem(req, res, next){
    console.log('getSingleItem endpoint requested');

    let response;
    try{
        response = await getItem(req.query);
    }catch(err){
        res.status(400).send(err.message);
    }

    res.send(response);
}

async function getRecommendation(req, res, next) {
    let response;
    try{
        response = await getUserRecommendation(req.query);
    }catch(err){
        res.status(400).send(err.message);
    }

    res.send(response);
}

module.exports = {getItems, loginUser, getSingleItem, getRecommendation}