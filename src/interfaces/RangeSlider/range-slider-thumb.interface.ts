import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDirectionProps,
  IElevationProps,
  IRippleProps,
  IRoundedProps,
  ISizeProps
} from '@foxy/interfaces'

import { TAlways } from '@foxy/types'

export interface IRangeSliderThumbProps extends ICommonsComponentProps, IColorProps, ISizeProps, IRippleProps, IElevationProps, IRoundedProps, IBorderProps, IDirectionProps {
  label?: TAlways
  min?: number
  max?: number
  focused?: boolean
  modelValue?: number
  position?: number
  readonly?: boolean
  disabled?: boolean
}