import type { MetaFunction } from '@remix-run/node';
import { CollectionCard } from './collection-card';
import { json } from '@remix-run/node';
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { Collection } from './collection';

export const meta: MetaFunction = () => [
  { title: 'Rookery' },
  { name: 'description', content: 'Rookery' },
];

type CollectionsResponse = {
  type: 'Collections',
  data: ReadonlyArray<Collection>,
};

export const loader = async () => {
  const response = await fetch('http://localhost:44002/collections');
  const value: CollectionsResponse = await response.json();
  return json(value.data);
};

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function Collections() {
  const collections = useLoaderData<typeof loader>();

  return (
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
  );
}

