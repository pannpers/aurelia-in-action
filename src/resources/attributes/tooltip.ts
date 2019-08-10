import { autoinject, bindable } from 'aurelia-framework'
import * as $ from 'jquery'

@autoinject()
export class TooltipCustomAttribute {
  @bindable title: string
  @bindable placement: string

  constructor(private element: Element) {}

  attached(): void {
    $(this.element).tooltip({ title: this.title, placement: this.placement })
  }

  detached(): void {
    $(this.element).tooltip('dispose')
  }
}
