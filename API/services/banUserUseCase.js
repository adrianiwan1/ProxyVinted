const repository = require('../repositories/repository')

async function banUser(userId = undefined) {
    if(userId === undefined) throw new Error('userId required!');
    
    return await repository.setNewBan(userId);
}

module.exports = { banUser }