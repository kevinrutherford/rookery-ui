export type EntryResource = {
  id: string,
  attributes: {
    addedAt: string,
  },
  frontMatter?: {
    title: string,
  },
  relationships: {
    work: {
      id: string,
    },
  },
}

