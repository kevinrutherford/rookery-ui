export type EntrySummary = {
  id: string,
  title: string,
  doi: string,
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

