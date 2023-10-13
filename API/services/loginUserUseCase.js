const repository = require('../repositories/repository');

async function login(userData){
    let dbUserData = await repository.getLoginData(userData.login);

    if(dbUserData[0] !== undefined){

        if(isUserBanned(dbUserData[0].isBanned)){
            throw new Error('Konto zbanowane');
        }

        if(compareLoginData(dbUserData[0], userData)){
            let userRole = await repository.getUserRole(dbUserData[0].role);
            
            if(userRole[0] !== undefined)
                return {userId: dbUserData[0].id, login: dbUserData[0].user, role: userRole[0].name};
            else
                throw new Error('Błąd łączenia z bazą danych');
        }else{
            throw new Error('Błędne hasło');
        }
    }
    
    throw new Error('Błędny login');
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