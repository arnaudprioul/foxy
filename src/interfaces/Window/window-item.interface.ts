import { ICommonsComponentProps, IGroupItemProps, ILazyProps, ITransitionComponentProps } from '@foxy/interfaces'

export interface IWindowItemProps extends ICommonsComponentProps, ILazyProps, IGroupItemProps, ITransitionComponentProps {
  transition?: boolean | string
  reverseTransition?: boolean | string
}