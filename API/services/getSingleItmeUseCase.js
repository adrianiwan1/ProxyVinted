const { random } = require('user-agents')
const cookie = require('cookie')

const parseVintedURL = ({ domain = 'pl', itemId = '' }) => {
  return `https://www.vinted.${domain}/api/v2/items/${itemId}`
}
async function getItem (itemId) {
  const vintedResult = await vintedSearch(itemId)

  return vintedResult
}

async function vintedSearch (searchParams) {
  const c = await fetchCookie('pl')
  const response = await fetch(parseVintedURL(searchParams), {
    headers: {
      'user-agent': random(),
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

module.exports = { getItem }
