export const fetchRoot = async () => {
  const response = await fetch('http://views:44002/')
  return await response.json()
}

