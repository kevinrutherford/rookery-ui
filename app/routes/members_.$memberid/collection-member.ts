export type Reply = {
  id: string,
  author: string,
  content: string,
  timestamp: string,
  replies: ReadonlyArray<Reply>,
};

export type CollectionMember = {
  id: string,
  doi: string,
  title: string,
  comments: ReadonlyArray<Reply>,
};

