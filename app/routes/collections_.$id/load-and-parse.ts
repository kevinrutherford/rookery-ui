import * as E from 'fp-ts/lib/Either.js'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { formatValidationErrors } from 'io-ts-reporters'

export const loadAndParse = async <C>(uri: string, codec: t.Decoder<unknown, C>) => {
  const response = await fetch(uri)
  const value = await response.json()
  return pipe(
    value,
    codec.decode,
    E.getOrElseW((errors) => {
      throw new Error(formatValidationErrors(errors).join('\n'))
    }),
  )
}

