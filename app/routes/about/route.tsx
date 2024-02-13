import { json } from '@remix-run/node';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ColumnTitle } from '~/components/column-title';
import { contentNavItems } from '~/components/content-nav-items';
import { useLoaderData } from '@remix-run/react';

type AboutResponse = {
  type: 'About',
  data: {
    community: {
      name: string,
      affiliation: string,
      overview: string,
      admins: ReadonlyArray<string>,
    },
    backend: {
      version: string,
    },
  },
};

export const loader = async () => {
  const value: AboutResponse = {
    type: 'About',
    data: {
      community: {
        name: 'Health organisation, policy and economics (HOPE)',
        affiliation: 'Centre for Primary Care and Health Services Research, Manchester University',
        overview: `
        This interdisciplinary theme focuses upon research which investigates the supply, organisation, management and financing of health and social care services.

Our expertise encompasses rigorous econometric analysis and a wide range of qualitative social scientific methods, including particular experience in the use of ethnographic approaches to understand organisational processes.`,
        admins: ['@DonnaB', '@kevin'],
      },
      backend: {
        version: 'unknown',
      },
    },
  };
  return json(value.data);
};

export default function About() {
  const about = useLoaderData<typeof loader>();
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

