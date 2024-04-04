export type EntryResource = {
  id: string,
  attributes: {
    addedAt: string,
    commentsCount: number,
  },
  relationships: {
    work: {
      id: string,
    },
  },
}

