export const fetchAllCollections = async () => {
  const response = await fetch('http://views:44002/collections', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEVELOPMENT_BEARER_TOKEN}`,
    },
  })
  return await response.json()
}

