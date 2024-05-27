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
  ITagProps,
  IAdjacentProps
} from '@foxy/interfaces'

import { TIcon } from '@foxy/types'

export interface IBtnProps extends ICommonsComponentProps, IColorProps, IBorderProps, IDensityProps, IDimensionProps, IElevationProps, IRoundedProps, ITagProps, ISizeProps, ILinkProps, IRippleProps, ILoaderProps, IPositionProps, ILocationProps, IGroupItemProps, IPaddingProps, IMarginProps, IAdjacentProps {
  active?: boolean
  flat?: boolean,
  icon?: boolean | TIcon
  block?: boolean
  slim?: boolean
  stacked?: boolean
  text?: string
}