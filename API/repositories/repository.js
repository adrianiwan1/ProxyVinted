const database = require('../database')

function getLoginData (userLogin) {
  const query = `SELECT id, user, password, role, isBanned FROM user WHERE user = '${userLogin}'`

  return database.sqlQuery(query)
}

function getUserRole (roleId) {
  const query = `SELECT name FROM roles WHERE id = ${roleId}`

  return database.sqlQuery(query)
}

async function storeNewSearch (userId, { searchText = '', order = 'newest_first', catalogIDs = '', colorIDs = '', brandIDs = '', sizeIDs = '', materialIDs = '', videoGameRatingIDs = '', statusIDs = '', isForSwap = 0, page = 1, perPage = 24 }) {
  const query = `INSERT INTO searchquery (user, searchText, \`order\`, catalogIDs, brandIDs, materialIDs, videoGameRatingIDs, statusIDs, isForSwap, page, perPage) VALUES (${userId}, '${searchText}', '${order}', '${catalogIDs}', '${brandIDs}', '${materialIDs}', '${videoGameRatingIDs}', '${statusIDs}', ${isForSwap}, ${page}, ${perPage})`

  return !!await database.sqlQuery(query)
}

function getUserRecommendation (userId) {
  return database.sqlQuery(`SELECT catalogIDs FROM searchquery WHERE user=${userId} GROUP BY catalogIDs ORDER BY catalogIDs DESC LIMIT 1`)
}

async function setNewBan(userId) {
  const query = `UPDATE user SET isBanned = 1 WHERE id = ${userId}`

  return await database.sqlQuery(query);
}


function getAllUsers() {
  const query = `SELECT id, user FROM user`

  return database.sqlQuery(query)
}
module.exports = { getLoginData, getUserRole, storeNewSearch, getUserRecommendation, setNewBan, getAllUsers }
