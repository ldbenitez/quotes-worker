import { getRandomIndex, getJson } from './utils'

const QUOTES_TABLE_EN = 'Quotes'
const QUOTES_TABLE_ES = 'Frases'
const QUOTES_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/`

const getQuotes = async () => {
  const quotesUrl = `${QUOTES_API_URL}${QUOTES_TABLE_EN}`
  const quotesData = await getJson(quotesUrl, {
    headers: {
      authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'content-type': 'application/json',
    },
  })
  return quotesData.records.map(r => r.fields)
}

const getQuote = async () => {
  const quotes = await getQuotes()
  return JSON.stringify(quotes[getRandomIndex(quotes.length)])
}

export { getQuote }
