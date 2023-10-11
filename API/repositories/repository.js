const database = require('../database');

async function getLoginData(userLogin){
    let query = `SELECT id, user, password, role, isBanned FROM user WHERE user = '${userLogin}'`;

    try{
        let userData = await database.sqlQuery(query);

        return userData;
    }catch(err){
        throw err;
    }
}

async function getUserRole(roleId){
    let query = `SELECT name FROM roles WHERE id = ${roleId}`;

    try{
        let userRole = await database.sqlQuery(query);

        return userRole;
    }catch(err){
        throw err;
    }
}

module.exports = {getLoginData, getUserRole}