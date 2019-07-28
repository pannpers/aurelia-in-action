import { HttpClient } from 'aurelia-fetch-client'
import { autoinject } from 'aurelia-framework'
import { Book } from 'resources/elements/books'

@autoinject
export class BookApi {
  constructor(private http: HttpClient) {}

  getBooks(): Promise<Book[]> {
    return this.http
      .fetch('books.json')
      .then(resp => resp.json())
      .then(books => books as Book[])
  }
}
