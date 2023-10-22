const repository = require('../repositories/repository');

module.exports.getUserRecommendation = function ({ id } = {}) {
  if (!id) throw new Error('userID required!')

  return repository.getUserRecommendation(id)
}