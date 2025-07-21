import type { ICommonsComponentProps, ISelectionControlProps } from '@/interfaces'
import type { TIcon } from '@/types'

export interface ICheckboxBtnProps extends ICommonsComponentProps, ISelectionControlProps {
    indeterminate?: boolean
    indeterminateIcon?: TIcon
}
