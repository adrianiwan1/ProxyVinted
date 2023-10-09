import { createPool } from "mysql";

const dbConfig = {};

dbConfig.databasePool = createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookStore'
})

export default dbConfig;