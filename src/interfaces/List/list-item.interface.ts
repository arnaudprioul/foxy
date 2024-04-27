import {
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

import { TIcon, TLines } from '@foxy/types'

export interface IListItemProps extends IBorderProps, ICommonsComponentProps, IDensityProps, IDimensionProps, IElevationProps, IRoundedProps, ITagProps, ILinkProps, IColorProps, IRippleProps, IPaddingProps, IMarginProps {
  active?: boolean
  activeClass?: string
  appendAvatar?: string
  appendIcon?: TIcon
  disabled?: boolean
  lines?: TLines
  link?: boolean
  nav?: boolean
  prependAvatar?: string
  prependIcon?: TIcon
  slim?: string
  subtitle?: string | number
  title?: string | number
  value?: any
}