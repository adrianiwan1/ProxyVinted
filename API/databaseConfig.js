var mysql = require("mysql");

const dbConfig = {};

dbConfig.databasePool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vintedproxy'
})

module.exports = dbConfig;