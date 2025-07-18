import type { ICommonsComponentProps, IGroupItemProps, ILazyProps, ITransitionComponentProps } from '@foxui/interfaces'

export interface IWindowItemProps extends ICommonsComponentProps, ILazyProps, IGroupItemProps, ITransitionComponentProps {
    transition?: boolean | string
    reverseTransition?: boolean | string
}
