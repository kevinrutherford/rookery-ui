import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ColumnTitle } from '~/components/column-title';
import { contentNavItems } from '~/components/content-nav-items';
import { ReactNode } from 'react';
import { Info } from './info';

export const renderPageContent = (about: Info): ReactNode => {
  const navItem = contentNavItems.about;
  return (
    <>
      <ColumnTitle title={navItem.title} icon={InformationCircleIcon} />
      <div className='grow bg-white p-4'>
        <h1 className='text-teal-700 font-semibold text-xl mb-4'>{about.community.name}</h1>
        <h2 className='text-teal-700 italic mb-4'>{about.community.affiliation}</h2>
        <div className='mb-4'>{about.community.overview}</div>
        <h3 className='text-teal-700 font-semibold text-lg mb-4'>Admins:</h3>
        <ul className='mb-4'>{about.community.admins.map((admin) => (
          <li key={admin}>{admin}</li>
        ))}</ul>
        <p>
          <span className='text-teal-700 font-semibold mb-4'>Backend version:</span> {about.backend.version}
        </p>
      </div>
    </>
  );
}

