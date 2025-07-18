import type { IHoverHtmlElement, IHoverOptions } from '@origam/interfaces'

import type { THoverEvent } from '@origam/types'

export const ORIGAM_HOVER_STOP_KEY = Symbol('origam:hoverStop')

export const HOVER = {
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
    }
}
