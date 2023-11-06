const repository = require('../repositories/repository')

function getUsers() {
    
    return repository.getAllUsers();
}

module.exports = { getUsers }