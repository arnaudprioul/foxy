import { ICommonsComponentProps, IInputProps, ISelectionControlProps } from '@foxy/interfaces'

import { TIcon } from '@foxy/types'

export interface ICheckboxProps extends ICommonsComponentProps, IInputProps, ICheckboxBtnProps {

}

export interface ICheckboxBtnProps extends ICommonsComponentProps, ISelectionControlProps {
  indeterminate?: boolean
  indeterminateIcon?: TIcon
}