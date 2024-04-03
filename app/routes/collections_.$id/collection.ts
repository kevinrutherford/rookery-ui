export type EntryResource = {
  id: string,
  frontMatter?: {
    title: string,
  },
  relationships: {
    work: {
      id: string,
    },
  },
}

