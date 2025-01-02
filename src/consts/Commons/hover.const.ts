import { IHoverHtmlElement, IHoverOptions } from '@foxy/interfaces'

import { THoverEvent } from '@foxy/types'

export const FOXY_HOVER_STOP_KEY = Symbol('foxy:hoverStop')

export const HOVER = {
  /* eslint-disable max-statements */
  show (
      _e: THoverEvent,
      el: IHoverHtmlElement,
      value: IHoverOptions
  ) {
    if (!el?._hover?.enabled) {
      return
    }

    el.classList.add(value.class)
  },

  hide (el: IHoverHtmlElement | null, value: IHoverOptions) {
    if (!el?._hover?.enabled) return

    el.classList.remove(value.class)
  },
}
