import * as t from 'io-ts'

export const workResource = t.type({
  type: t.literal('work'),
  id: t.string,
})

export type WorkResource = t.TypeOf<typeof workResource>

