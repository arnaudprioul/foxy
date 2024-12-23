import {
  IAdjacentProps,
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IDimensionProps,
  IElevationProps,
  ILinkProps,
  IMarginProps,
  IPaddingProps,
  IRippleProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

import { TLines } from '@foxy/types'

export interface IListItemProps extends IBorderProps, ICommonsComponentProps, IDensityProps, IDimensionProps, IElevationProps, IRoundedProps, ITagProps, ILinkProps, IColorProps, IRippleProps, IPaddingProps, IMarginProps, IAdjacentProps {
  active?: boolean
  activeClass?: string
  disabled?: boolean
  lines?: TLines
  link?: boolean
  nav?: boolean
  slim?: boolean
  subtitle?: string | number
  title?: string | number
  value?: any
}
