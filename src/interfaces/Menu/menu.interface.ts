import type { IListItemProps, IListProps, IOverlayProps } from '@origam/interfaces'

export interface IMenuProvide {
    register (): void

    unregister (): void

    closeParents (): void
}

export interface IMenuProps extends IOverlayProps, IListProps, IListItemProps {
    id?: string
}
