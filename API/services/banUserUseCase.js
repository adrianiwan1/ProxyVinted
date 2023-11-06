const repository = require('../repositories/repository')

async function banUser(userId = undefined) {
    if(userId === undefined) throw new Error('userId required!');
    
    return await repository.setNewBan(userId);
}

async function unBanUser(userId = undefined) {
    if(userId === undefined) throw new Error('userId required!');
    
    return await repository.setNewUnBan(userId);
}

module.exports = { banUser, unBanUser }