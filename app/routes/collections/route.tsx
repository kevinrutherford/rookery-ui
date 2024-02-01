import type { MetaFunction } from '@remix-run/node';
import { FC } from 'react';
import { Metadatum } from './metadatum';

export const meta: MetaFunction = () => [
  { title: 'Rookery' },
  { name: 'description', content: 'Rookery' },
];

type Collection = {
  name: string,
  description: string,
  papersCount: number,
  commentsCount: number,
  followersCount: number,
  lastActivityAt: string,
};

type CollectionCardProps = {
  collection: Collection,
};

const CollectionCard: FC<CollectionCardProps> = (props: CollectionCardProps) => (
  <div className='bg-white p-4'>
    <h2 className='font-semibold text-teal-700 mb-4'>{props.collection.name}</h2>
    <p className='mb-4'>{props.collection.description}</p>
    <ul className='flex justify-between'>
      <li><Metadatum>{props.collection.papersCount} papers</Metadatum></li>
      <li><Metadatum>{props.collection.commentsCount} comments</Metadatum></li>
      <li><Metadatum>{props.collection.followersCount} followers</Metadatum></li>
      <li><Metadatum>{props.collection.lastActivityAt}</Metadatum></li>
    </ul>
  </div>
);

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

