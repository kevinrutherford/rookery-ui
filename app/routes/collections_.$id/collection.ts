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

export type Collection = {
  id: string,
  name: string,
  description: string,
  entries: ReadonlyArray<EntryResource>,
}

