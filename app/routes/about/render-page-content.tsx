import { ReactNode } from 'react'
import { CommunityResource } from '~/api-resources/community'
import { Card } from '~/components/card'

export const renderPageContent = (about: CommunityResource): ReactNode => (
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
  </div>
)

