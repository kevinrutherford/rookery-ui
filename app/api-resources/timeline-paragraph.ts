import * as t from 'io-ts'
import * as tt from 'io-ts-types'

export const timelineParagraphResource = t.type({
  type: t.literal('timeline-paragraph'),
  id: t.string,
  attributes: t.type({
    userHandle: t.string,
    timestamp: tt.DateFromISOString,
    action: t.string,
    content: t.string,
  }),
})

export type TimelineParagraphResource = t.TypeOf<typeof timelineParagraphResource>

