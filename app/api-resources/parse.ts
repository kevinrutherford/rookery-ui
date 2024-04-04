import * as E from 'fp-ts/lib/Either.js'
import { pipe } from 'fp-ts/lib/function.js'
import * as t from 'io-ts'
import { formatValidationErrors } from 'io-ts-reporters'

export const parse = <C>(codec: t.Decoder<unknown, C>) => (input: unknown) => pipe(
  input,
  codec.decode,
  E.getOrElseW((errors) => {
    throw new Error(formatValidationErrors(errors).join('\n'))
  }),
)

