import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import type { ReactNode } from 'react'

type NavItem = {
  title: string,
  icon: ReactNode,
  route: string,
}

export const contentNavItems: Record<string, NavItem> = {
  collections: {
    title: 'Local collections',
    icon: <ClipboardDocumentListIcon className='h-10 w-10 p-2 inline' />,
    route: 'collections',
  },
  about: {
    title: 'About',
    icon: <InformationCircleIcon className='h-10 w-10 p-2 inline' />,
    route: 'about',
  },
}

