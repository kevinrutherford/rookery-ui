export const fetchEntry = async (entryId: string) => {
  const response = await fetch(`http://views:44002/entries/${entryId}?include=collection,comments,work`)
  return await response.json()
}

