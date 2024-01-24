import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => [
  { title: 'Rookery' },
  { name: 'description', content: 'Rookery' },
];

export default function Settings() {
  return (
    <div className='grow bg-white p-4'>
      <p>Settings...</p>
    </div>
  );
}

