import { bindable, autoinject } from 'aurelia-framework'
import { EventAggregator, Subscription } from 'aurelia-event-aggregator'
import { Book, BookEvent } from './books'

@autoinject
export class BookDetail {
  @bindable book: Book
  @bindable searchTerm: string

  private editModeChangedSubscription: Subscription

  private editMode = false

  constructor(private ea: EventAggregator) {}

  bind(): void {
    this.editModeChangedSubscription = this.ea.subscribe(
      BookEvent.EDIT_MODE_CHANGED,
      (mode): void => {
        this.editMode = mode
      },
    )
  }

  unbind(): void {
    this.editModeChangedSubscription.dispose()
  }

  markRead(): void {
    this.book.readDate = new Date()
    this.book.read = true
  }

  removeBook(): void {
    this.ea.publish(BookEvent.REMOVED, this.book)
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode
  }
}
