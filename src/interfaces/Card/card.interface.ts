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
  ITagProps,
  IAdjacentProps
} from '@foxy/interfaces'

import { TCardType } from '@foxy/types'

export interface ICardProps extends ICommonsComponentProps, ITagProps, IBorderProps, IDensityProps, IDimensionProps, IElevationProps, ILoaderProps, ILocationProps, IPositionProps, IRoundedProps, IMarginProps, IPaddingProps, ILinkProps, IRippleProps, IAdjacentProps {
  disabled?: boolean
  flat?: boolean
  hover?: boolean
  image?: string
  link?: boolean
  subtitle?: string | number
  text?: string | number
  title?: string | number
  type?: Record<string, TCardType>
}