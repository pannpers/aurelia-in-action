import { bindable, DOM } from 'aurelia-framework'
import { getLogger } from 'aurelia-logging'

export enum CustomEvent {
  CHANGE = 'change',
}

export interface ChangeCustomEvent extends Event {
  rating: number
}

interface Star {
  type: string
  displayType: string
  rated: boolean
}

export class StarRating {
  private readonly logger = getLogger(StarRating.name)

  @bindable rating: number
  stars: Star[] = [
    { type: 'far', displayType: 'far', rated: false },
    { type: 'far', displayType: 'far', rated: false },
    { type: 'far', displayType: 'far', rated: false },
    { type: 'far', displayType: 'far', rated: false },
    { type: 'far', displayType: 'far', rated: false },
  ]
  hovered = false

  constructor(private element: Element) {}

  bind(): void {}

  applyRating(rating: number): void {
    this.stars.forEach((star, index): void =>
      this.rateStar(star, rating, index),
    )
  }

  rateStar(star: Star, rating: number, index: number): void {
    index < rating ? this.toggleOn(star) : this.toggleOff(star)
  }

  toggleOn(star: Star): void {
    star.displayType = 'fas'
    star.type = 'fas'
    star.rated = true
  }

  toggleOff(star: Star): void {
    star.displayType = 'far'
    star.type = 'far'
    star.rated = false
  }

  rate(index: number): void {
    const rating = this.ratingFromIndex(index, this.stars[0])
    this.rating = rating
    this.applyRating(rating)
    this.raiseChangedEvent()
  }

  ratingFromIndex(index: number, star: Star): number {
    if (index === 0 && star.rated) return 0
    return index + 1
  }

  raiseChangedEvent(): void {
    const changeEvent = DOM.createCustomEvent(CustomEvent.CHANGE, {
      detail: { rating: this.rating },
    })
    this.element.dispatchEvent(changeEvent)
  }

  mouseOver(hoverIndex: number): void {
    if (this.hovered) return

    this.logger.debug('mouseOver', hoverIndex)
    this.hovered = true
    this.applyHoverState(hoverIndex)
  }

  mouseOut(hoverIndex: number): void {
    if (!this.hovered) return

    this.logger.debug('mouseOut', hoverIndex)
    this.hovered = false
    this.applyHoverState(hoverIndex)
  }

  applyHoverState(hoverIndex: number): void {
    this.stars.forEach((star: Star, index: number): void => {
      if (!this.shouldApplyHover(index, hoverIndex, star)) return

      if (this.hovered) {
        star.displayType = 'fas'
      } else {
        star.displayType = star.type
      }
    })
  }

  shouldApplyHover(
    startIndex: number,
    hoverIndex: number,
    star: Star,
  ): boolean {
    return startIndex <= hoverIndex && !star.rated
  }
}
