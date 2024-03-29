import { ReactNode } from 'react'
import { Card } from '~/components/card'
import { Info } from './info'

export const renderPageContent = (about: Info): ReactNode => (
  <div className='grow'>
    <Card>
      <h1 className='font-semibold text-xl mb-4'>{about.community.name}</h1>
      <h2 className='italic mb-4'>{about.community.affiliation}</h2>
      <div className='mb-4'>{about.community.overview}</div>
    </Card>
    <Card>
      <h3 className='font-semibold text-lg mb-4'>Admins:</h3>
      <ul className='mb-4'>{about.community.admins.map((admin) => (
        <li key={admin}>{admin}</li>
      ))}</ul>
    </Card>
    <Card>
      <p>
        <span className='font-semibold mb-4'>Backend version:</span> {about.backend.version}
      </p>
    </Card>
  </div>
)

