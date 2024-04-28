import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IDimensionProps,
  IElevationProps,
  IGroupProps,
  ILayoutItemProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

import { TMode } from '@foxy/types'

export interface IBottomNavProps extends ITagProps, ICommonsComponentProps, IColorProps, IPaddingProps, IBorderProps, IElevationProps, IMarginProps, IDimensionProps, IDensityProps, IRoundedProps, ILayoutItemProps, IGroupProps {
  grow?: boolean
  mode?: TMode
  active?: boolean
}