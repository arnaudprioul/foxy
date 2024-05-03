import { IColorProps, ICommonsComponentProps, IDirectionProps, IMarginProps } from '@foxy/interfaces'

export interface IDividerProps extends ICommonsComponentProps, IColorProps, IMarginProps, IDirectionProps {
  inset?: boolean
  length?: number | string
  thickness?: number | string
}