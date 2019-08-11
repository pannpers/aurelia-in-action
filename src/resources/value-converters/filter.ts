import { Book } from 'resources/elements/books'

export class FilterValueConverter {
  toView(items: Book[], searchTerm: string): Book[] {
    if (!searchTerm) return items

    return items.filter(item => this.itemMatches(searchTerm, item))
  }

  itemMatches(searchTerm: string, item: Book): boolean {
    const itemValue = item.title
    if (!itemValue) return false

    return itemValue.toUpperCase().includes(searchTerm.toUpperCase())
  }
}
