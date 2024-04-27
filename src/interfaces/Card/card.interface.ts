import {
  IBorderProps,
  ICommonsComponentProps,
  IDensityProps,
  IDimensionProps,
  IElevationProps,
  ILinkProps,
  ILoaderProps,
  ILocationProps,
  IMarginProps,
  IPaddingProps,
  IPositionProps, IRippleProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

import { TCardType, TIcon } from '@foxy/types'

export interface ICardProps extends ICommonsComponentProps, ITagProps, IBorderProps, IDensityProps, IDimensionProps, IElevationProps, ILoaderProps, ILocationProps, IPositionProps, IRoundedProps, IMarginProps, IPaddingProps, ILinkProps, IRippleProps{
  appendAvatar?: string
  appendIcon?: TIcon
  disabled?: boolean
  flat?: boolean
  hover?: boolean
  image?: string
  link?: boolean
  prependAvatar?: string
  prependIcon?: TIcon
  subtitle?: string | number
  text?: string | number
  title?: string | number
  type?: TCardType
}