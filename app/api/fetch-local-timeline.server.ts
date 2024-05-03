export const fetchLocalTimeline = async () => {
  const response = await fetch('http://views:44002/timelines/local')
  return await response.json()
}

