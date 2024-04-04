export type EntryResource = {
  id: string,
  attributes: {
    addedAt: string,
    commentsCount: number,
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

