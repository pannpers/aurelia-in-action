import { bindable } from 'aurelia-framework'
import { Book } from './books'

export class BookList {
  @bindable books: Book[]

  removeBook(index: number): void {
    this.books.splice(index, 1)
  }
}
