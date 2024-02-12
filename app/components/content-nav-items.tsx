import type { ReactNode } from 'react';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

type NavItem = {
  title: string,
  icon: ReactNode,
  route: string,
};

export const contentNavItems: ReadonlyArray<NavItem> = [
  {
    title: 'Local collections',
    icon: <ClipboardDocumentListIcon className='h-10 w-10 p-2 inline' />,
    route: 'collections',
  },
  {
    title: 'About',
    icon: <InformationCircleIcon className='h-10 w-10 p-2 inline' />,
    route: 'about',
  },
];

