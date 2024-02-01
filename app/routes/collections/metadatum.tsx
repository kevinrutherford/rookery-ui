import type { FC, ReactNode } from 'react';

type CollectionMetadataProps = {
  children: ReactNode;
};

export const Metadatum: FC<CollectionMetadataProps> = (props: CollectionMetadataProps) => (
  <div className='text-sm text-teal-700'>
    {props.children}
  </div>
);

