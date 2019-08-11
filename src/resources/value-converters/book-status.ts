export class BookStatusValueConverter {
  toView(value: string): string {
    switch (value) {
      case 'bad':
        return 'fa-frown'
      case 'good':
        return 'fa-smile'
      case 'ok':
        return 'fa-meh'
      default:
        return ''
    }
  }
}
