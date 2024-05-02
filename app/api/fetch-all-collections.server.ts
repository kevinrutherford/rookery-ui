export const fetchAllCollections = async () => {
  const response = await fetch('http://views:44002/collections')
  return await response.json()
}

