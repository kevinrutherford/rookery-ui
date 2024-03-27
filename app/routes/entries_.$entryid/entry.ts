export type Reply = {
  id: string,
  content: string,
}

export type Entry = {
  type: 'entry',
  id: string,
  attributes: {
    addedAt: string,
  },
  frontMatter?: {
    title: string,
    abstract: string,
    authors: ReadonlyArray<string>,
  },
  comments: ReadonlyArray<Reply>,
  relationships: {
    work: {
      type: 'work',
      id: string,
    },
  },
}

