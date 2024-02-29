import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Info } from './info';
import { renderPageContent } from './render-page-content';

type AboutResponse = {
  type: 'About',
  data: Info,
};

export const loader = async () => {
  const response = await fetch('http://views:44002/about');
  const value: AboutResponse = await response.json();
  return json(value.data);
};

export default function About() {
  const about = useLoaderData<typeof loader>();
  return renderPageContent(about);
}

