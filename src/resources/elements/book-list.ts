import { bindable } from 'aurelia-framework'
import { EventAggregator } from 'aurelia-event-aggregator'
import { getLogger } from 'aurelia-logging'
import { Book, BookEvent } from './books'

export class BookList {
  @bindable books: Book[]
  private readonly logger = getLogger(BookList.name)

  constructor(private ea: EventAggregator) {}

  bind(): void {
    this.logger.debug('books', this.books)
  }

  removeBook(index: number): void {
    this.ea.publish(BookEvent.REMOVED, index)
  }

  bookLocation(isFirst: boolean, isLast: boolean): string {
    if (isFirst) return '- first book'
    if (isLast) return '- last book'
    return ''
  }
}
