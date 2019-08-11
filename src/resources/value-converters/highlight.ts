export class HighlightValueConverter {
  toView(value: string): string {
    if (value && value.includes('<b>')) {
      return `<span style='background-color: #eceeef; padding: 10px'>${value}</span>`
    }
    return value
  }
}
