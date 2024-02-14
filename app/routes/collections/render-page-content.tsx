import { CollectionCard } from './collection-card';
import { Collection } from './collection';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { ColumnTitle } from '~/components/column-title';
import { contentNavItems } from '~/components/content-nav-items';
import { ReactNode } from 'react';

export const renderPageContent = (data: ReadonlyArray<Collection>): ReactNode => {
  const navItem = contentNavItems.collections;
  return (
    <>
      <ColumnTitle title={navItem.title} icon={ClipboardDocumentListIcon} />
      <div className='grow'>
        <ul className='overflow-y-auto'>
          { data.map((collection) => (
            <li key={collection.name} className='border-b border-slate-500'>
              <CollectionCard collection={collection} />
            </li>
          ))
          }
        </ul>
      </div>
    </>
  );
}

