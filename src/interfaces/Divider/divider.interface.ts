import { IColorProps, ICommonsComponentProps, IMarginProps } from '@foxy/interfaces'

export interface IDividerProps extends ICommonsComponentProps, IColorProps, IMarginProps {
  inset?: boolean
  length?: number | string
  thickness?: number | string
  vertical?: boolean
}