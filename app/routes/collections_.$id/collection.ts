export type EntryResource = {
  id: string,
  attributes: {
    addedAt: Date,
    commentsCount: number,
  },
  relationships: {
    work: {
      id: string,
    },
  },
}

