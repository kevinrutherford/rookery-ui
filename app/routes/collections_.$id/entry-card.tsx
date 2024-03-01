import { Link } from '@remix-run/react';
import { FC } from 'react';
import { Card } from '~/components/card';
import { Metadatum } from '~/components/metadatum';
import { EntrySummary } from './collection';

type EntryCardProps = {
  collectionid: string,
  entry: EntrySummary,
};

export const EntryCard: FC<EntryCardProps> = (props: EntryCardProps) => (
  <Card>
    <Link to={`/entries/${props.entry.id}`} className='block hover:underline'>
      <h2 className='mb-4'>{props.entry.title}</h2>
      <ul className='flex justify-between'>
        <li><Metadatum>{props.entry.commentsCount} comments</Metadatum></li>
        <li><Metadatum>{props.entry.latestActivityAt}</Metadatum></li>
      </ul>
    </Link>
  </Card>
);

