export type Reply = {
  id: string,
  content: string,
}

export type Entry = {
  id: string,
  doi: string,
  frontMatter?: {
    title: string,
    abstract: string,
    authors: ReadonlyArray<string>,
  },
  comments: ReadonlyArray<Reply>,
}

