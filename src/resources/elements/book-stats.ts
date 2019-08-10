import { bindable, computedFrom } from 'aurelia-framework'
import { Book } from './books'

export class BookStats {
  @bindable books: Book[]
  @bindable originalNumberOfBooks

  @computedFrom('originalNumberOfBooks', 'books.length')
  get addedBooks(): number {
    return this.books.length - this.originalNumberOfBooks
  }
}
