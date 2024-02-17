import { Link } from '@remix-run/react';
import { FC } from 'react';
import { MemberSummary } from './collection';
import { Metadatum } from './metadatum';

type MemberCardProps = {
  member: MemberSummary,
};

export const MemberCard: FC<MemberCardProps> = (props: MemberCardProps) => (
  <Link to={`/collections/${props.member.id}`} className='block hover:underline bg-white p-4 rounded-md'>
    <h2 className='mb-4'>{props.member.title}</h2>
    <ul className='flex justify-between'>
      <li><Metadatum>{props.member.commentsCount} comments</Metadatum></li>
      <li><Metadatum>{props.member.latestActivityAt}</Metadatum></li>
    </ul>
  </Link>
);

