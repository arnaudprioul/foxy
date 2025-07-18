import type { TObserveHandler } from '@origam/types'

import type { DirectiveBinding } from 'vue'

export interface IIntersectDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
    value?: TObserveHandler | { handler: TObserveHandler, options?: IntersectionObserverInit }
    modifiers: {
        once?: boolean
        quiet?: boolean
    }
}

export interface IIntersectHtmlElement extends HTMLElement {
    _observe?: IIntersectHtmlElementObserve
}

export interface IIntersectHtmlElementObserve {
    [key: string]: any
}
