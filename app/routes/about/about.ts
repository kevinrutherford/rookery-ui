export type About = {
  community: {
    name: string,
    affiliation: string,
    overview: string,
    admins: ReadonlyArray<string>,
  },
  backend: {
    version: string,
  },
};

