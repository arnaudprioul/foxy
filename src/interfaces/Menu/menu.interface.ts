import { IListItemProps, IListProps, IOverlayProps } from '@foxy/interfaces'

export interface IMenuProvide {
  register (): void
  unregister (): void
  closeParents (): void
}

export interface IMenuProps extends IOverlayProps, IListProps, IListItemProps {
  id?: string
}