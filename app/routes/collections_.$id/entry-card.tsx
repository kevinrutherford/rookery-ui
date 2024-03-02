import { Link } from '@remix-run/react';
import { FC } from 'react';
import { Card } from '~/components/card';
import { EntrySummary } from './collection';

type EntryCardProps = {
  collectionid: string,
  entry: EntrySummary,
};

export const EntryCard: FC<EntryCardProps> = (props: EntryCardProps) => (
  <Card>
    <Link to={`/entries/${props.entry.id}`} className='block hover:underline'>
      <h2 className='font-semibold mb-4'>{props.entry.frontMatter ? props.entry.frontMatter.title : 'Title: Unknown at present'}</h2>
      <p className='mb-4'>doi: {props.entry.doi}</p>
    </Link>
  </Card>
);

