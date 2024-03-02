import { Link } from '@remix-run/react';
import { FC } from 'react';
import { Card } from '~/components/card';
import { CollectionSummary } from './collection-summary';

type CollectionCardProps = {
  collection: CollectionSummary,
};

export const CollectionCard: FC<CollectionCardProps> = (props: CollectionCardProps) => (
  <Card>
    <Link to={`/collections/${props.collection.id}`} className='block hover:underline'>
      <h2 className='font-semibold mb-4'>{props.collection.name}</h2>
      <p className='mb-4'>{props.collection.description}</p>
    </Link>
  </Card>
);

