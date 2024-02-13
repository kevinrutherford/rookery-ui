import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ColumnTitle } from '~/components/column-title';
import { contentNavItems } from '~/components/content-nav-items';
import { ReactNode } from 'react';
import { About } from './about';

export const renderPageContent = (about: About): ReactNode => {
  const navItem = contentNavItems.about;
  return (
    <>
      <ColumnTitle title={navItem.title} icon={InformationCircleIcon} />
      <div className='grow bg-white p-4'>
        <h1>{about.community.name}</h1>
        <h2>{about.community.affiliation}</h2>
        <div>{about.community.overview}</div>
        <h3>Admins:</h3>
        <ul>{about.community.admins.map((admin) => (
          <li key={admin}>{admin}</li>
        ))}</ul>
        <h4>Backend version: {about.backend.version}</h4>
      </div>
    </>
  );
}

