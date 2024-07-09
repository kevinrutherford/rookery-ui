import * as t from 'io-ts'

const frontMatterNotDetermined = t.type({
  crossrefStatus: t.literal('not-determined'),
})

const frontMatterNotFound = t.type({
  crossrefStatus: t.literal('not-found'),
})

const frontMatterFound = t.type({
  crossrefStatus: t.literal('found'),
  title: t.string,
  abstract: t.string,
  authors: t.array(t.string),
})

export const workIdentifier = t.type({
  type: t.literal('work'),
  id: t.string,
})

export const workResource = t.intersection([
  workIdentifier,
  t.type({
    attributes: t.intersection([
      t.type({
        doi: t.string,
      }),
      t.union([frontMatterNotDetermined, frontMatterNotFound, frontMatterFound]),
    ]),
  }),
])

export type WorkResource = t.TypeOf<typeof workResource>

