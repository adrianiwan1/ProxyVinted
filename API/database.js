const util = require('util')
const dbConfig = require('./databaseConfig')

module.exports = { sqlQuery: util.promisify(dbConfig.databasePool.query).bind(dbConfig.databasePool) }
