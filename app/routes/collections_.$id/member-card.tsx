import { Link } from '@remix-run/react';
import { FC } from 'react';
import { Card } from '~/components/card';
import { Metadatum } from '~/components/metadatum';
import { MemberSummary } from './collection';

type MemberCardProps = {
  collectionid: string,
  member: MemberSummary,
};

export const MemberCard: FC<MemberCardProps> = (props: MemberCardProps) => (
  <Card>
    <Link to={`/members/${props.member.id}`} className='block hover:underline'>
      <h2 className='mb-4'>{props.member.title}</h2>
      <ul className='flex justify-between'>
        <li><Metadatum>{props.member.commentsCount} comments</Metadatum></li>
        <li><Metadatum>{props.member.latestActivityAt}</Metadatum></li>
      </ul>
    </Link>
  </Card>
);

