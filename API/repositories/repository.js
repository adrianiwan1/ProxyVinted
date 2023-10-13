const database = require('../database');

async function getLoginData(userLogin){
    let query = `SELECT id, user, password, role, isBanned FROM user WHERE user = '${userLogin}'`;

    let userData = await database.sqlQuery(query);

    return userData;
}

async function getUserRole(roleId){
    let query = `SELECT name FROM roles WHERE id = ${roleId}`;

    let userRole = await database.sqlQuery(query);

    return userRole;
}

async function storeNewSearch(userId, { searchText = '', order = 'newest_first', catalogIDs = '', colorIDs = '', brandIDs = '', sizeIDs = '', materialIDs = '', videoGameRatingIDs = '', statusIDs = '', isForSwap = 0, page = 1, perPage = 24 }){
    let query = `INSERT INTO searchquery (user, searchText, order, catalogIDs, brandIDs, materialIDs, videoGameRatingIDs, statusIDs, isForSwap, page, perPage)
                    VALUES  (${userId}, '${searchText}', '${order}', '${catalogIDs}', '${brandIDs}', '${materialIDs}', 
                                '${videoGameRatingIDs}', '${statusIDs}', ${isForSwap}, ${page}, ${perPage})`;

    return !!await database.sqlQuery(query);
}

module.exports = {getLoginData, getUserRole, storeNewSearch}