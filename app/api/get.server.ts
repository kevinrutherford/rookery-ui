export const get = async (path: string) => fetch(`http://views:44002${path}`, {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.DEVELOPMENT_BEARER_TOKEN}`,
  },
})

