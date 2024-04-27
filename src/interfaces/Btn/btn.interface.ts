import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IDimensionProps,
  IElevationProps,
  IGroupItemProps,
  ILinkProps,
  ILoaderProps,
  ILocationProps,
  IMarginProps,
  IPaddingProps,
  IPositionProps,
  IRippleProps,
  IRoundedProps,
  ISizeProps,
  ITagProps
} from '@foxy/interfaces'

import { TIcon } from '@foxy/types'

export interface IBtnProps extends ICommonsComponentProps, IColorProps, IBorderProps, IDensityProps, IDimensionProps, IElevationProps, IRoundedProps, ITagProps, ISizeProps, ILinkProps, IRippleProps, ILoaderProps, IPositionProps, ILocationProps, IGroupItemProps, IPaddingProps, IMarginProps {
  active?: boolean
  symbol?: any
  flat?: boolean,
  icon?: boolean | TIcon
  prependIcon?: TIcon
  appendIcon?: TIcon
  block?: boolean
  slim?: boolean
  stacked?: boolean
  text?: string
}