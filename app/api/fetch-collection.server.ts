export const fetchCollection = async (id: string) => {
  const response = await fetch(`http://views:44002/collections/${id}?include=entries,entries.work`)
  return await response.json()
}

