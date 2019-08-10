import { bindable } from 'aurelia-framework'
import { Book } from './books'

export class BookList {
  @bindable books: Book[]

  removeBook(index: number): void {
    this.books.splice(index, 1)
  }

  bookLocation(isFirst: boolean, isLast: boolean): string {
    if (isFirst) return '- first book'
    if (isLast) return '- last book'
    return ''
  }
}
