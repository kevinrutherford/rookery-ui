export type Reply = {
  id: string,
  content: string,
};

export type Entry = {
  id: string,
  doi: string,
  title?: string,
  comments: ReadonlyArray<Reply>,
};

