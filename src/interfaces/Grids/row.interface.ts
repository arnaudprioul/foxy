import {
  IAlignProps,
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IJustifyProps,
  IMarginProps,
  IPaddingProps,
  ITagProps
} from '@foxy/interfaces'

import { TFlexDirection } from '@foxy/types'

export interface IRowProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IColorProps, IDensityProps, IAlignProps, IJustifyProps {
  gutters?: string | number
  direction?: TFlexDirection
}