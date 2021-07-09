const getRandomIndex = arrayLength => {
  return Math.floor(Math.random() * arrayLength)
}

const getJson = async (url, config) => {
  const response = await fetch(url, config)
  if (!response.ok) {
    throw new Error('Error getting quotes from airtable')
  }
  return response.json()
}

export { getRandomIndex, getJson }
