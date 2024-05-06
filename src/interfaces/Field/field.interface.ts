import {
  IAdjacentInnerProps,
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IFocusProps,
  ILoaderProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps
} from '@foxy/interfaces'

export interface IFieldProps extends ICommonsComponentProps, ILoaderProps, IRoundedProps, IBorderProps, IPaddingProps, IMarginProps, IColorProps, IAdjacentInnerProps, IFocusProps, IDensityProps {
  active?: boolean
  centerAffix?: boolean
  dirty?: boolean
  disabled?: boolean
  error?: boolean
  flat?: boolean
  label?: string
  persistentClear?: boolean
  reverse?: boolean
  singleLine?: boolean
}