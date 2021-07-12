import { getQuote } from './quotes'

const PATH_LANG = {
  '/es': 'es',
  '/en': 'en',
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { pathname } = new URL(request.url)
  const language = PATH_LANG[pathname]

  if (language) {
    const quote = await getQuote(language)
    return new Response(quote, {
      headers: {
        'content-type': 'application/json',
      },
    })
  } else {
    return new Response('The language path is not valid', {
      headers: {
        status: 400,
        statusText: 'Bad Request',
        'content-type': 'text/plain',
      },
    })
  }
}
