import { CollectionMember } from './collection';
import { ReactNode } from 'react';

export const renderPageContent = (member: CollectionMember): ReactNode => (
  <div className='grow'>
    <p className='font-semibold'>{member.title}</p>
    <ul className='overflow-y-auto'>
      { member.comments.map((comment) => (
        <li key={comment.id} className='mb-4'>
          {comment.content}
        </li>
      ))
      }
    </ul>
  </div>
)

