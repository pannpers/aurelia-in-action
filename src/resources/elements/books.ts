import { autoinject } from 'aurelia-framework'
import { BookApi } from 'services/book-api'

export interface Book {
  title: string
}

@autoinject
export class Books {
  private books: Book[] = []
  private bookTitle = ''

  constructor(private api: BookApi) {}

  async bind(): Promise<void> {
    const savedBook = await this.api.getBooks()
    this.books = savedBook
  }

  addBook(): void {
    this.books.push({ title: this.bookTitle })
    this.bookTitle = ''
  }
}
