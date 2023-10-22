const {random} = require('user-agents')
const cookie = require('cookie')

const parseVintedURL = ({ domain = 'pl', itemId = '' }) => {
    return `https://www.vinted.${domain}/api/v2/items/${itemId}`;
}
async function getItem(itemId){
    let vintedResult = await vintedSearch(itemId);

    return vintedResult;
}

async function vintedSearch(searchParams) {
    const c = await fetchCookie('pl')
    const response = await fetch(parseVintedURL(searchParams), {
      headers: {
        'user-agent': random(),
        cookie: '_vinted_fr_session=' + c,
        accept: 'application/json, text/plain, */*'
      }
    })
    if (!response.ok) throw response.json()
    console.log(response)
    return response.json()
  }

async function fetchCookie(domain = 'pl') {
    const response = await fetch(`https://vinted.${domain}`)
    const sessionCookie = response.headers.get('set-cookie')
    if (!sessionCookie) throw new Error('Session cookie not found')
    const c = cookie.parse(sessionCookie)['secure, _vinted_fr_session']
    return c
  }


module.exports = { getItem };