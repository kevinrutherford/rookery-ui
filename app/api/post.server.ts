export const post = async (path: string, body: object) => fetch(`http://commands:44001${path}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.DEVELOPMENT_BEARER_TOKEN}`,
  },
  body: JSON.stringify(body),
})

