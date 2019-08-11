import { format } from 'date-fns'

export class DateFormatValueConverter {
  toView(value: Date): string {
    if (!value) return ''

    return format(value, 'MM/DD/YYYY hh:mm:ss a')
  }
}
