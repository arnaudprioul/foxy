import type { TEventProp } from '@foxy/types'

import { PropType } from 'vue'

export const IN_BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined'

export const DEFAULT_DOCUMENT = /* #__PURE__ */ IN_BROWSER ? window.document : undefined

export const EVENT_PROP = <T extends Array<any> = Array<any>> () => [Function as PropType<(e: Event, ...args: T) => void>, Array] as PropType<TEventProp<T>>

export const HISTORY = 20
export const HORIZON = 100

export const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window

export const ON_REGEX = /^on[^a-z]/

export const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0)

export const SUPPORTS_EYE_DROPPER = IN_BROWSER && 'EyeDropper' in window

export const KEYBOARD_VALUES = Object.freeze({
    ENTER: 'Enter',
    TAB: 'Tab',
    DELETE: 'Delete',
    ESC: 'Escape',
    SPACE: 'Space',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    END: 'End',
    HOME: 'Home',
    DEL: 'Delete',
    BACKSPACE: 'Backspace',
    INSERT: 'Insert',
    PAGEUP: 'PageUp',
    PAGEDOWN: 'PageDown',
    SHIFT: 'Shift',
    EMPTY: ' '
})
