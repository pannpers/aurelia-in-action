import { bindable, computedFrom, autoinject } from 'aurelia-framework'
import { EventAggregator, Subscription } from 'aurelia-event-aggregator'
import { getLogger } from 'aurelia-logging'
import { Book, BookEvent } from './books'
import { CustomEvent, ChangeCustomEvent, StarRating } from './star-rating'

@autoinject
export class EditBook {
  private readonly logger = getLogger(EditBook.name)

  @bindable book
  @bindable editMode

  private bookSaveCompleteSubscription: Subscription

  private temporaryBook: Book
  private loading = false
  private saved = false

  private ratingElement: Element
  private starRatingViewModel: StarRating

  private readonly ratingChangedListener = (e: ChangeCustomEvent): void => {
    this.temporaryBook.rating = e.rating
  }

  constructor(private ea: EventAggregator) {}

  bind(): void {
    this.resetTempBook()
    this.ratingElement.addEventListener(
      CustomEvent.CHANGE,
      this.ratingChangedListener,
    )
  }

  attached(): void {
    this.bookSaveCompleteSubscription = this.ea.subscribe(
      `${BookEvent.SAVE_COMPLETE}-${this.book.id}`,
      (): void => this.bookSaveComplete(),
    )
  }

  detached(): void {
    this.bookSaveCompleteSubscription.dispose()
    this.ratingElement.removeEventListener(
      CustomEvent.CHANGE,
      this.ratingChangedListener,
    )
  }

  editModeChanged(editModeNew: true): void {
    if (editModeNew) {
      this.resetTempBook()
    }
  }

  @computedFrom(
    'temporaryBook.title',
    'temporaryBook.description',
    'temporaryBook.rating',
  )
  get canSave(): boolean {
    this.logger.debug('canSave computed')
    return this.temporaryBook && !this.isEqual()
  }

  resetTempBook(): void {
    this.temporaryBook = { ...this.book }
  }

  cancel(): void {
    this.temporaryBook = this.book
    this.starRatingViewModel.applyRating(this.temporaryBook.rating)
    this.toggleEditMode()
  }

  save(): void {
    this.loading = true
    this.ea.publish(BookEvent.SAVE, this.temporaryBook)
  }

  bookSaveComplete(): void {
    this.loading = false
    this.saved = true
    setTimeout((): void => {
      this.resetTempBook()
      this.saved = false
      this.toggleEditMode()
    }, 500)
  }

  toggleEditMode(): void {
    this.ea.publish(BookEvent.EDIT_MODE_CHANGED, !this.editMode)
  }

  isEqual(): boolean {
    return (
      this.temporaryBook.title === this.book.title &&
      this.temporaryBook.description === this.book.description &&
      this.temporaryBook.rating === this.book.rating
      // this.temporaryBook.readDate === this.book.readDate &&
      // this.temporaryBook.read === this.book.read
    )
  }
}
