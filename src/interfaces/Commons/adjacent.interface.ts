import { TEventProp, TIcon } from '@foxy/types'

export interface IAdjacentProps {
  appendAvatar?: string
  appendIcon?: TIcon
  prependAvatar?: string
  prependIcon?: TIcon

  'onClick:prepend'?: TEventProp<[MouseEvent]>
  'onClick:append'?: TEventProp<[MouseEvent]>
}

export interface IAdjacentInnerProps {
  appendInnerAvatar?: string
  appendInnerIcon: TIcon
  prependInnerAvatar?: string
  prependInnerIcon: TIcon
  clearIcon?: TIcon
  clearable?: boolean

  'onClick:clear'?: TEventProp<[MouseEvent]>
  'onClick:appendInner'?: TEventProp<[MouseEvent]>
  'onClick:prependInner'?: TEventProp<[MouseEvent]>
}