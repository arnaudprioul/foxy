import type { ICommonsComponentProps, ISelectionControlProps } from '@foxui/interfaces'
import type { TIcon } from '@foxui/types'

export interface ICheckboxBtnProps extends ICommonsComponentProps, ISelectionControlProps {
    indeterminate?: boolean
    indeterminateIcon?: TIcon
}
