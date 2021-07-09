import { getQuote } from './quotes'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const quote = await getQuote()
  return new Response(quote, {
    headers: { 'content-type': 'application/json' },
  })
}
