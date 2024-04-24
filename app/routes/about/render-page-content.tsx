import { ReactNode } from 'react'
import { CommunityResource } from '~/api-resources/community'
import { Card } from '~/components/card'

export const renderPageContent = (community: CommunityResource): ReactNode => (
  <div className='grow'>
    <Card>
      <h1 className='font-semibold text-xl mb-4'>{community.attributes.name}</h1>
      <h2 className='italic mb-4'>{community.attributes.affiliation}</h2>
      {community.attributes.overview.map((para, ix) => (
        <p key={ix} className='mb-4'>{para}</p>
      ))}
    </Card>
  </div>
)

