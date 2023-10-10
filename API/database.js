const util = require('util');
const dbConfig = require('./databaseConfig');

async function sqlQuery(query){
    const queryExecute = util.promisify(dbConfig.databasePool.query).bind(dbConfig.databasePool);

    data = await queryExecute(query);
    
    return data;
}

module.exports = { sqlQuery }