import { InformationCircleIcon } from '@heroicons/react/24/solid';
import type { MetaFunction } from '@remix-run/node';
import { ColumnTitle } from '~/components/column-title';

export const meta: MetaFunction = () => [
  { title: 'Rookery' },
  { name: 'description', content: 'Rookery' },
];

export default function About() {
  return (
    <>
      <ColumnTitle title='About' icon={InformationCircleIcon} />
      <div className='grow bg-white p-4'>
        <p>About...</p>
      </div></>
  );
}

