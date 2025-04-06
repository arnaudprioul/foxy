import { DirectiveBinding } from 'vue'

export interface IHoverProps {
  hover?: boolean | { class: string }
}

export interface IHoverDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value?: boolean | { class: string }
  modifiers: {
    callback: () => void,
    stop?: boolean
  }
}

export interface IHoverOptions {
  class: string
}

export interface IHoverHtmlElement extends HTMLElement {
  _hover?: IHoverHtmlElementHover
}

export interface IHoverHtmlElementHover {
  enabled?: boolean
  class?: string
  touched?: boolean
  isTouch?: boolean
}
