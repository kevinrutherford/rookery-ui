import { FC } from 'react';
import { Collection } from './collection';
import { Metadatum } from './metadatum';

type CollectionCardProps = {
  collection: Collection,
};

export const CollectionCard: FC<CollectionCardProps> = (props: CollectionCardProps) => (
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

