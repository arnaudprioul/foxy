import type { ICommonsComponentProps, IGroupItemProps, ILazyProps, ITransitionComponentProps } from '@origam/interfaces'

export interface IWindowItemProps extends ICommonsComponentProps, ILazyProps, IGroupItemProps, ITransitionComponentProps {
    transition?: boolean | string
    reverseTransition?: boolean | string
}
