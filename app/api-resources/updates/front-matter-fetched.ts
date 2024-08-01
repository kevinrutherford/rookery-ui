import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { memberIdentifier } from '../member'
import { workIdentifier } from '../work'

export const updateFrontMatterFetched = t.type({
  type: t.literal('update:front-matter-fetched'),
  id: t.string,
  attributes: t.type({
    occurred_at: tt.DateFromISOString,
  }),
  relationships: t.type({
    actor: t.type({ data: memberIdentifier }),
    work: t.type({ data: workIdentifier }),
  }),
})

