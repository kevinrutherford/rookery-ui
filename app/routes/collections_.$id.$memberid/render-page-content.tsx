import { Collection } from './collection';
import { ReactNode } from 'react';
import { MemberCard } from './member-card';

export const renderPageContent = (collection: Collection): ReactNode => (
  <div className='grow'>
    <p className='font-semibold'>{collection.name}</p>
    <p className='mb-4'>{collection.description}</p>
    <ul className='overflow-y-auto'>
      { collection.members.map((member) => (
        <li key={member.id} className='mb-4'>
          <MemberCard member={member} />
        </li>
      ))
      }
    </ul>
  </div>
)

