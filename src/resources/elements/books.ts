import { autoinject, computedFrom } from 'aurelia-framework'
import { BookApi } from 'services/book-api'
import { EventAggregator, Subscription } from 'aurelia-event-aggregator'

export enum BookEvent {
  REMOVED = 'book-removed',
  EDIT_MODE_CHANGED = 'edit-mode-changed',
  SAVE = 'save-book',
  SAVE_COMPLETE = 'book-save-complete',
}

export interface Book {
  id?: number
  title: string
  description?: string
  readDate?: Date
  read?: boolean
  rating?: number
}

@autoinject
export class Books {
  private books: Book[] = []
  private bookTitle = ''

  private bookRemovedSubscription: Subscription
  private bookSavedSubscription: Subscription

  constructor(private api: BookApi, private ea: EventAggregator) {}

  async bind(): Promise<void> {
    const savedBook = await this.api.getBooks()
    this.books = savedBook
  }

  attached(): void {
    this.bookRemovedSubscription = this.ea.subscribe(
      BookEvent.REMOVED,
      (bookIndex): void => this.removeBook(bookIndex),
    )
    this.bookSavedSubscription = this.ea.subscribe(BookEvent.SAVE, book =>
      this.saveBook(book),
    )
  }

  detached(): void {
    this.bookRemovedSubscription.dispose()
    this.bookSavedSubscription.dispose()
  }

  addBook(): void {
    this.books.push({ title: this.bookTitle })
    this.bookTitle = ''
  }

  async saveBook(updatedBook: Book): Promise<void> {
    const index = this.books.findIndex(book => book.id === updatedBook.id)
    Object.assign(this.books[index], updatedBook)
    const savedBook = await this.api.saveBook(updatedBook)
    this.ea.publish(`${BookEvent.SAVE_COMPLETE}-${savedBook.id}`)
  }

  removeBook(book: Book): void {
    const bookIndex = this.books.findIndex((b): boolean => b.id === book.id)
    this.books.splice(bookIndex, 1)
  }

  @computedFrom('bookTitle.length')
  get canAdd(): boolean {
    return this.bookTitle.length > 0
  }
}
