import { getRandomIndex, getJson } from './utils'

const DEFAULT_QUOTES_TABLE = 'Quotes'
const QUOTES_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/`

const QUOTES_LANG_TABLE = {
  es: 'Frases',
  en: 'Quotes',
}

const getQuotes = async lang => {
  const quotesUrl = `${QUOTES_API_URL}${QUOTES_LANG_TABLE[lang] ||
    DEFAULT_QUOTES_TABLE}`
  const quotesData = await getJson(quotesUrl, {
    headers: {
      authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'content-type': 'application/json',
    },
  })
  return quotesData.records.map(r => r.fields)
}

const getQuote = async lang => {
  const quotes = await getQuotes(lang)
  return JSON.stringify(quotes[getRandomIndex(quotes.length)])
}

export { getQuote }
