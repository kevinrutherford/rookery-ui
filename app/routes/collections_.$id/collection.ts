export type MemberSummary = {
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
  members: ReadonlyArray<MemberSummary>,
};

