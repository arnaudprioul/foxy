import type { ICommonsComponentProps, ISelectionControlProps } from '@origam/interfaces'
import type { TIcon } from '@origam/types'

export interface ICheckboxBtnProps extends ICommonsComponentProps, ISelectionControlProps {
    indeterminate?: boolean
    indeterminateIcon?: TIcon
}
