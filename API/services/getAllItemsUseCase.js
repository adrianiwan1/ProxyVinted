const { random } = require('user-agents')
const cookie = require('cookie')
const repository = require('../repositories/repository')

const parseVintedURL = ({ searchText = '', order = 'newest_first', domain = 'pl', catalogIDs = '', colorIDs = '', brandIDs = '', sizeIDs = '', materialIDs = '', videoGameRatingIDs = '', statusIDs = '', isForSwap = 0, page = 1, perPage = 24 }) => {
  return `https://www.vinted.${domain}/api/v2/catalog/items?search_text=${searchText}&order=${order}&catalog_ids=${catalogIDs}&color_ids=${colorIDs}&brand_ids=${brandIDs}&size_ids=${sizeIDs}&material_ids=${materialIDs}&video_game_rating_ids=${videoGameRatingIDs}&status_ids=${statusIDs}&is_for_swap=${isForSwap}&page=${page}&per_page=${perPage}`
}

async function getAllItems (searchParams = {}) {
  const vintedResult = await vintedSearch(searchParams)

  if (searchParams.userId !== undefined) {
    repository.storeNewSearch(searchParams.userId, searchParams)
  }

  return vintedResult
}

async function vintedSearch (searchParams) {
  const c = await fetchCookie('pl')
  const response = await fetch(parseVintedURL(searchParams), {
    headers: {
      'User-Agent': random(),
      cookie: c,
      accept: 'application/json, text/plain, */*'
    }
  })
  if (!response.ok) throw response.json()
  return response.json()
}

async function fetchCookie (domain = 'pl') {
  const response = await fetch(`https://vinted.${domain}`)
  const sessionCookie = response.headers.get('set-cookie')
  if (!sessionCookie) throw new Error('Session cookie not found')
  let cookies = sessionCookie.split(';')
  const cookieSesion = cookies[11].split(', ')
  return cookieSesion[1]
}

module.exports = { getAllItems }
