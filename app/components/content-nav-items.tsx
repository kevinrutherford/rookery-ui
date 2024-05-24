type NavItem = {
  title: string,
  route: string,
}

export const contentNavItems: Record<string, NavItem> = {
  collections: {
    title: 'Local collections',
    route: 'collections',
  },
  about: {
    title: 'About',
    route: 'about',
  },
}

