export type EntrySummary = {
  id: string,
  doi: string,
  frontMatter?: {
    title: string,
  },
  commentsCount: number,
  latestActivityAt: string,
};

export type Collection = {
  id: string,
  name: string,
  description: string,
  commentsCount: number,
  followersCount: number,
  entries: ReadonlyArray<EntrySummary>,
};

