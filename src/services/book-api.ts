import { HttpClient } from 'aurelia-fetch-client'
import { autoinject } from 'aurelia-framework'
import { Book } from 'resources/elements/books'

@autoinject
export class BookApi {
  constructor(private http: HttpClient) {}

  async getBooks(): Promise<Book[]> {
    const resp = await this.http.fetch('books.json')
    return resp.json()
  }

  async saveBook(book: Book): Promise<Book> {
    return new Promise(resolve => {
      setTimeout(() => resolve(book), 1000)
    })
  }
}
