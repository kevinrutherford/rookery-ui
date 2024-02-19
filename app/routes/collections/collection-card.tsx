import { Link } from '@remix-run/react';
import { FC } from 'react';
import { Card } from '~/components/card';
import { Metadatum } from '~/components/metadatum';
import { CollectionSummary } from './collection-summary';

type CollectionCardProps = {
  collection: CollectionSummary,
};

export const CollectionCard: FC<CollectionCardProps> = (props: CollectionCardProps) => (
  <Card>
    <Link to={props.collection.id} className='block hover:underline'>
      <h2 className='font-semibold mb-4'>{props.collection.name}</h2>
      <p className='mb-4'>{props.collection.description}</p>
      <ul className='flex justify-between'>
        <li><Metadatum>{props.collection.papersCount} papers</Metadatum></li>
        <li><Metadatum>{props.collection.commentsCount} comments</Metadatum></li>
        <li><Metadatum>{props.collection.followersCount} followers</Metadatum></li>
        <li><Metadatum>{props.collection.lastActivityAt}</Metadatum></li>
      </ul>
    </Link>
  </Card>
);

