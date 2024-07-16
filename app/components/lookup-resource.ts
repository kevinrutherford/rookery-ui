import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'

type Reference = {
  data: JsonApiIdentifier,
}

type JsonApiIdentifier = {
  type: string,
  id: string,
}

export const lookupResource = (resources: ReadonlyArray<JsonApiIdentifier>, reference: Reference) => pipe(
  resources,
  RA.filter((inc) => inc.type === reference.data.type && inc.id === reference.data.id),
  RA.head,
  O.getOrElseW(() => { throw new Error(`Resources expected to include ${JSON.stringify(reference)}`) }),
)

