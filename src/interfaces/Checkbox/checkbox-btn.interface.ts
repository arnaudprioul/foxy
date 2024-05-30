import { ICommonsComponentProps, ISelectionControlProps } from '@foxy/interfaces'
import { TIcon } from '@foxy/types'

export interface ICheckboxBtnProps extends ICommonsComponentProps, ISelectionControlProps {
  indeterminate?: boolean
  indeterminateIcon?: TIcon
}