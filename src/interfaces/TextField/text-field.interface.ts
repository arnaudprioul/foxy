import {
  IBorderProps, IColorProps,
  ICommonsComponentProps, IDensityProps, IElevationProps,
  IFieldProps,
  IInputProps,
  IMarginProps,
  IPaddingProps, IRoundedProps
} from '@foxy/interfaces'

import { TTextFieldType } from '@foxy/types'

export interface ITextFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps {
  autofocus?: boolean
  counter?: boolean | number | string
  counterValue?: number | Function
  placeholder?: string
  persistentPlaceholder?: boolean
  persistentCounter?: boolean
  role?: string
  type?: Record<string, TTextFieldType>
  modelModifiers?: string | boolean
}
