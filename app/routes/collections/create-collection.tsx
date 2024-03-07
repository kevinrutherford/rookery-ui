import { useFetcher } from '@remix-run/react';
import { FC } from 'react';

export const CreateCollection: FC = () => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post" action="/collections">
      <input name="name" type="text" />
      <input name="description" type="text" />
      <input name="handle" type="text" />
      <button type="submit">Create</button>
    </fetcher.Form>
  );
};

