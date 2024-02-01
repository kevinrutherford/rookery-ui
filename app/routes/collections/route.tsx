import type { MetaFunction } from '@remix-run/node';
import { Metadatum } from './metadatum';

export const meta: MetaFunction = () => [
  { title: 'Rookery' },
  { name: 'description', content: 'Rookery' },
];

export default function Collections() {
  return (
    <div className='grow'>
      <ul className='overflow-y-auto'>
        <li className='border-b border-teal-500'>
          <div className='bg-white p-4'>
            <h2 className='font-semibold text-teal-700 mb-4'>CHS</h2>
            <p className='mb-4'>Papers under review by the CHS project.</p>
            <ul className='flex justify-between'>
              <li><Metadatum>12 papers</Metadatum></li>
              <li><Metadatum>19 comments</Metadatum></li>
              <li><Metadatum>4 followers</Metadatum></li>
              <li><Metadatum>Last updated 4 hours ago</Metadatum></li>
            </ul>
          </div>
        </li>
        <li className='border-b border-teal-500'>
          <div className='bg-white p-4'>
            <h2 className='font-semibold text-teal-700 mb-4'>PRU3</h2>
            <p className='mb-4'>Papers to be referenced by the PRU3 project.</p>
            <ul className='flex justify-between'>
              <li><Metadatum>134 papers</Metadatum></li>
              <li><Metadatum>258 comments</Metadatum></li>
              <li><Metadatum>11 followers</Metadatum></li>
              <li><Metadatum>Last updated 3 days ago</Metadatum></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

