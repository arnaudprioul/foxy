import { TEventProp } from '@foxy/types'

export interface IFocusProps {
  focused?: boolean,
  'onUpdate:focused'?: TEventProp<[boolean]>
}