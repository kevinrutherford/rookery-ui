import type { MetaFunction } from '@remix-run/node';
import { Collection } from './collection';
import { CollectionCard } from './collection-card';

export const meta: MetaFunction = () => [
  { title: 'Rookery' },
  { name: 'description', content: 'Rookery' },
];

export default function Collections() {
  const colls: ReadonlyArray<Collection> = [
    {
      name: 'CHS',
      description: 'Papers under review by the CHS project',
      papersCount: 12,
      commentsCount: 23,
      followersCount: 4,
      lastActivityAt: '4 hours ago',
    },
    {
      name: 'PRU3',
      description: 'Papers to be referenced by the PRU3 project',
      papersCount: 134,
      commentsCount: 258,
      followersCount: 11,
      lastActivityAt: '3 days ago',
    },
  ];

  return (
    <div className='grow'>
      <ul className='overflow-y-auto'>
        <li className='border-b border-teal-500'>
          <CollectionCard collection={colls[0]} />
        </li>
        <li className='border-b border-teal-500'>
          <CollectionCard collection={colls[1]} />
        </li>
      </ul>
    </div>
  );
}

