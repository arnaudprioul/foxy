import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IElevationProps,
  IInputProps,
  ILabelProps,
  IMarginProps,
  IPaddingProps,
  IRippleProps,
  IRoundedProps,
  ISizeProps,
  ITagProps
} from '@foxy/interfaces'

import { TBlock, TIcon } from '@foxy/types'

export interface IRatingFieldProps extends ICommonsComponentProps, IRippleProps, IDensityProps, IPaddingProps, IBorderProps, IMarginProps, IRoundedProps, IElevationProps, IColorProps, ISizeProps, ITagProps, IInputProps, ILabelProps {
  name?: string
  itemAriaLabel?: string
  clearable?: boolean
  disabled?: boolean
  emptyIcon?: TIcon
  fullIcon?: TIcon
  halfIncrements?: boolean
  hover?: boolean
  length?: number | string
  readonly?: boolean
  modelValue?: number | string
  itemLabels?: Array<string>
  itemLabelPosition?: TBlock
}