const {random} = require('user-agents')
const cookie = require('cookie')

const mapper = require('../middleware/mapper');

const parseVintedURL = ({ searchText = '', order = 'newest_first', domain = 'be', catalogIDs = '', colorIDs = '', brandIDs = '', sizeIDs = '', materialIDs = '', videoGameRatingIDs = '', statusIDs = '', isForSwap = 0, page = 1, perPage = 24 }) => {
    return `https://www.vinted.${domain}/api/v2/catalog/items?search_text=${searchText}&order=${order}&catalog_ids=${catalogIDs}&color_ids=${colorIDs}&brand_ids=${brandIDs}&size_ids=${sizeIDs}&material_ids=${materialIDs}&video_game_rating_ids=${videoGameRatingIDs}&status_ids=${statusIDs}&is_for_swap=${isForSwap}&page=${page}&per_page=${perPage}`
}

async function getAllItems(searchParams){
    let vintedResult;

    try{
        vintedResult = await vintedSearch(searchParams);

    }catch(err){
        throw err;
    }

    return vintedResult;
}

async function vintedSearch(searchParams) {
    const c = await fetchCookie('be')
    const response = await fetch(parseVintedURL(searchParams), {
      headers: {
        'user-agent': random(),
        cookie: '_vinted_fr_session=' + c,
        accept: 'application/json, text/plain, */*'
      }
    })
    if (!response.ok) throw response.json()
    return response.json()
  }

async function fetchCookie(domain = 'be') {
    const response = await fetch(`https://vinted.${domain}`)
    const sessionCookie = response.headers.get('set-cookie')
    if (!sessionCookie) throw new Error('Session cookie not found')
    const c = cookie.parse(sessionCookie)['secure, _vinted_fr_session']
    return c
  }

module.exports = {getAllItems}