import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps
} from '@foxy/interfaces'

import { TEventProp } from '@foxy/types'

export interface ILabelProps extends ICommonsComponentProps, IMarginProps, IPaddingProps, IBorderProps, IRoundedProps, IColorProps {
  text?: string,
  onClick?: TEventProp<[MouseEvent]>
}