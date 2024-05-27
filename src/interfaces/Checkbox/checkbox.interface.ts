import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps, IElevationProps,
  IInputProps, IMarginProps,
  IPaddingProps, IRoundedProps,
  ISelectionControlProps
} from '@foxy/interfaces'

import { TIcon } from '@foxy/types'

export interface ICheckboxProps extends ICommonsComponentProps, IInputProps, ICheckboxBtnProps, IDensityProps, IPaddingProps, IMarginProps, IRoundedProps, IColorProps, IBorderProps, IElevationProps {

}

export interface ICheckboxBtnProps extends ICommonsComponentProps, ISelectionControlProps {
  indeterminate?: boolean
  indeterminateIcon?: TIcon
}