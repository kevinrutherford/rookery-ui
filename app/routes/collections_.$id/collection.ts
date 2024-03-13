export type EntrySummary = {
  id: string,
  doi: string,
  frontMatter?: {
    title: string,
  },
}

export type Collection = {
  id: string,
  name: string,
  description: string,
  entries: ReadonlyArray<EntrySummary>,
}

