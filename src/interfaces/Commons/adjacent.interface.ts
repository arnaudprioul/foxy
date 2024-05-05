import { TEventProp, TIcon } from '@foxy/types'

export interface IAdjacentProps {
  appendAvatar?: string
  appendIcon?: TIcon
  prependAvatar?: string
  prependIcon?: TIcon

  'onClick:prepend'?: TEventProp<[MouseEvent]>
  'onClick:append'?: TEventProp<[MouseEvent]>
}

export interface IAdjacentInputProps extends IAdjacentProps {

}