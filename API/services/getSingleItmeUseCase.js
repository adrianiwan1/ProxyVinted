async function getItem(itemId){
    let response = `https://www.vinted.be/items/${itemId}`;

    return response;
}

module.exports = { getItem };