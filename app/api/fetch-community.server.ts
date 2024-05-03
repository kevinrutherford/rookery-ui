export const fetchCommunity = async () => {
  const response = await fetch('http://views:44002/community')
  return await response.json()
}

