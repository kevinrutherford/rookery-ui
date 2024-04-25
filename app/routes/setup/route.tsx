import { json } from '@remix-run/node'

export const loader = async () => {
  const response = await fetch('http://views:44002/community')
  const value = await response.json()
  return json(value)
}

export default function About() {
  return (
    <p>Let&apos;s get your community set up</p>
  )
}

