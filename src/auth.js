/**
 * Http Basic authentication based on the example provided in 
 * https://developers.cloudflare.com/workers/examples/basic-auth
 * 
 */
const USERNAME = BASIC_USER
const PASSWORD = BASIC_PASS

const hasCredentials = request => {
  return request.headers.has('authorization')
}

const getCredentials = authorization => {
  const parts = authorization.split(' ')
  const plainAuth = atob(parts[1]).normalize()
  const [user, pass] = plainAuth.split(':')
  return { username: user, password: pass }
}

const verifyCredentials = request => {
  if (!hasCredentials(request)) {
    return false
  }
  const authorization = request.headers.get('authorization')
  const credentials = getCredentials(authorization)
  return USERNAME === credentials.username && PASSWORD === credentials.password
}

export { verifyCredentials }
