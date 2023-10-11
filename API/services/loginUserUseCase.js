const repository = require('../repositories/repository');

async function login(userData){
    let dbUserData;

    try{
        dbUserData = await repository.getLoginData(userData.login);
    }catch(err){
        throw err;
    }

    if(dbUserData !== undefined){

        if(isUserBanned(dbUserData[0].isBanned)){
            return {loginError: false, passwordError: false, dbError: false, userBanned: true};
        }

        if(compareLoginData(dbUserData[0], userData)){
            let userRole = await repository.getUserRole(dbUserData[0].role);
            
            if(userRole[0] !== undefined)
                return {userId: dbUserData[0].id, login: dbUserData[0].user, role: userRole[0].name};
            else
                return {loginError: false, passwordError: false, dbError: true, userBanned: false};
        }else{
            return {loginError: true, passwordError: true, dbError: false, userBanned: false};
        }
    }
    
    return {loginError: true, passwordError: false, dbError: false, userBanned: false};
}

function compareLoginData(dbUserData, userData){
    let loginCompleated = true;

    if(dbUserData !== undefined){

        if(dbUserData.user !== userData.login){
            loginCompleated = false;
        }

        if(dbUserData.password !== userData.password){
            loginCompleated = false;
        }

    }else{
        loginCompleated = false;
    }

    return loginCompleated;
}

function isUserBanned(userBanStatus){
    let isBanned = false;

    if(userBanStatus === 1){
        isBanned = true;
    }

    return isBanned;
}

module.exports = {login}