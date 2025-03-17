import { TEventProp } from '@foxy/types'

import { PropType } from 'vue'

export const IN_BROWSER = typeof window !== 'undefined'

export const EVENT_PROP = <T extends Array<any> = Array<any>> () => [Function, Array] as PropType<TEventProp<T>>

export const HISTORY = 20
export const HORIZON = 100

export const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window

export const ON_REGEX = /^on[^a-z]/

export const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0)

export const SUPPORTS_EYE_DROPPER = IN_BROWSER && 'EyeDropper' in window
