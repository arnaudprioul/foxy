import {
  IBorderProps,
  ICommonsComponentProps,
  IDensityProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'
import { TIcon } from '@foxy/types'

export interface ICardHeaderProps extends ITagProps, ICommonsComponentProps, IBorderProps, IRoundedProps, IPaddingProps, IMarginProps, IDensityProps {
  appendAvatar?: string
  appendIcon?: TIcon
  prependAvatar?: string
  prependIcon?: TIcon
  subtitle?: string | number
  title?: string | number
}