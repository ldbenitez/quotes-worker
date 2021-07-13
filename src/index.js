import { getQuote } from './quotes'
import { verifyCredentials } from './auth'

const PATH_LANG = {
  '/es': 'es',
  '/en': 'en',
}

function getUnauthorizedResponse(message) {
  return new Response(message, {
    status: 401,
    headers: {
      'www-authenticate': 'Basic realm="auth"',
    },
  })
}

async function handleRequest(request) {
  if (!verifyCredentials(request)) {
    return getUnauthorizedResponse(
      'A valid combination of User and Password has to be provied.',
    )
  }

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

addEventListener('fetch', event => {
  event.respondWith(
    handleRequest(event.request).catch(err => {
      const message = err.reason || err.stack || 'Unknown Error'

      return new Response(message, {
        status: err.status || 500,
        statusText: err.statusText || null,
        headers: {
          'content-type': 'text/plain',
        },
      })
    }),
  )
})
