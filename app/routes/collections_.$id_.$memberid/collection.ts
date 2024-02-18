type Comment = {
  id: string,
  author: string,
  content: string,
  timestamp: string,
  replies: ReadonlyArray<Comment>,
};

export type CollectionMember = {
  id: string,
  doi: string,
  title: string,
  comments: ReadonlyArray<Comment>,
};

