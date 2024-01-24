import type { MetaFunction } from '@remix-run/node';
import type { FC, ReactNode } from 'react';

export const meta: MetaFunction = () => [
  { title: 'Rookery' },
  { name: 'description', content: 'Rookery' },
];

type CollectionMetadataProps = {
  children: ReactNode;
};

const CollectionMetadata: FC<CollectionMetadataProps> = (props: CollectionMetadataProps) => (
  <div className='text-sm text-amber-800'>
    {props.children}
  </div>
);

export default function Collections() {
  return (
    <div className='grow'>
      <ul className='overflow-y-auto'>
        <li className='border-b border-amber-500'>
          <div className='bg-white p-4'>
            <h2 className='font-semibold text-amber-800 mb-4'>CHS</h2>
            <p className='mb-4'>Papers under review by the CHS project.</p>
            <ul className='flex justify-between'>
              <li><CollectionMetadata>12 papers</CollectionMetadata></li>
              <li><CollectionMetadata>19 comments</CollectionMetadata></li>
              <li><CollectionMetadata>4 followers</CollectionMetadata></li>
              <li><CollectionMetadata>Last updated 4 hours ago</CollectionMetadata></li>
            </ul>
          </div>
        </li>
        <li className='border-b border-amber-500'>
          <div className='bg-white p-4'>
            <h2 className='font-semibold text-amber-800 mb-4'>PRU3</h2>
            <p className='mb-4'>Papers to be referenced by the PRU3 project.</p>
            <ul className='flex justify-between'>
              <li><CollectionMetadata>134 papers</CollectionMetadata></li>
              <li><CollectionMetadata>258 comments</CollectionMetadata></li>
              <li><CollectionMetadata>11 followers</CollectionMetadata></li>
              <li><CollectionMetadata>Last updated 3 days ago</CollectionMetadata></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

