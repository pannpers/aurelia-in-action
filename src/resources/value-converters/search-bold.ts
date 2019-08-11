export class SearchBoldValueConverter {
  toView(value: string, searchTerm: string): string {
    if (!searchTerm) return value
    return value.replace(new RegExp(searchTerm, 'gi'), `<b>$&</b>`)
  }
}
