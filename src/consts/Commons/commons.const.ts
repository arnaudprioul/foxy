import { PropType } from 'vue'

import { TEventProp } from '@foxy/types'
import { ICommonsComponentProps, ITagProps } from '@foxy/interfaces'

export const IN_BROWSER = typeof window !== 'undefined'

export const EVENT_PROP = <T extends any[] = any[]> () => [Function, Array] as PropType<TEventProp<T>>

export const HISTORY = 20
export const HORIZON = 100

export const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window

export const ON_REGEX = /^on[^a-z]/

export const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0)

export const COMMONS_COMPONENT_PROPS :ICommonsComponentProps = {
  class: undefined,
  style: undefined
}

export const TAG_PROPS:ITagProps = {
  tag: undefined
}