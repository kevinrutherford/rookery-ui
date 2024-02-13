import type { MetaFunction } from '@remix-run/node';
import { CollectionCard } from './collection-card';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Collection } from './collection';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { ColumnTitle } from '~/components/column-title';
import { contentNavItems } from '~/components/content-nav-items';

export const meta: MetaFunction = () => [
  { title: 'Rookery' },
  { name: 'description', content: 'Rookery' },
];

type CollectionsResponse = {
  type: 'Collections',
  data: ReadonlyArray<Collection>,
};

export const loader = async () => {
  const response = await fetch('http://backend:44002/collections');
  const value: CollectionsResponse = await response.json();
  return json(value.data);
};

export default function Collections() {
  const collections = useLoaderData<typeof loader>();
  const navItem = contentNavItems.collections;

  return (
    <>
      <ColumnTitle title={navItem.title} icon={ClipboardDocumentListIcon} />
      <div className='grow'>
        <ul className='overflow-y-auto'>
          { collections.map((collection) => (
            <li key={collection.name} className='border-b border-teal-500'>
              <CollectionCard collection={collection} />
            </li>
          ))
          }
        </ul>
      </div>
    </>
  );
}

