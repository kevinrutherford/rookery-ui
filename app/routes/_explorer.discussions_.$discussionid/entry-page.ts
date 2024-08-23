import { pipe } from 'fp-ts/lib/function.js'
import * as O from 'fp-ts/lib/Option.js'
import * as RA from 'fp-ts/lib/ReadonlyArray.js'
import { CollectionResource } from '~/api-resources/collection'
import { CommentResource } from '~/api-resources/comment'
import { DiscussionResource } from '~/api-resources/discussion'
import { WorkResource } from '~/api-resources/work'
import { DiscussionResponse } from './route'

export class DiscussionPage {
  readonly discussion: DiscussionResource
  readonly collection: CollectionResource
  readonly work: WorkResource
  readonly includedComments: ReadonlyArray<CommentResource>

  constructor(response: DiscussionResponse) {
    this.discussion = response.data
    this.collection = pipe(
      response.included,
      RA.filter((inc): inc is CollectionResource => inc.type === 'collection'),
      RA.head,
      O.getOrElseW(() => { throw new Error('No collection included with Discussion') }),
    )
    this.work = pipe(
      response.included,
      RA.filter((inc): inc is WorkResource => inc.type === 'work'),
      RA.head,
      O.getOrElseW(() => { throw new Error('No Work included with Discussion') }),
    )
    this.includedComments = pipe(
      response.included,
      RA.filter((inc): inc is CommentResource => inc.type === 'comment'),
    )
  }

  addedAt(): Date {
    return this.discussion.attributes.addedAt
  }

  collectionId() {
    return this.collection.id
  }

  collectionName() {
    return this.collection.attributes.name
  }

  comments() {
    return this.includedComments
  }

  doi() {
    return this.work.id
  }

  id() {
    return this.discussion.id
  }

  isPaper() {
    return this.work.attributes.crossrefStatus !== 'not-found'
  }

  title() {
    return this.discussion.attributes.title
  }
}

