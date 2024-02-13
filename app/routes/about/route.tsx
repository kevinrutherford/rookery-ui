import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Info } from './info';
import { renderPageContent } from './render-page-content';

type AboutResponse = {
  type: 'About',
  data: Info,
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
  return renderPageContent(about);
}

