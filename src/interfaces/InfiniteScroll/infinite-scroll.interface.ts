import type { IColorProps, ICommonsComponentProps, IDimensionProps, IDirectionProps, ITagProps } from '@foxy/interfaces'

import type { TInfiniteScrollMode, TInfiniteScrollSide } from '@foxy/types'

export interface IInfiniteScrollProps extends ICommonsComponentProps, IColorProps, IDimensionProps, ITagProps, IDirectionProps {
    side?: TInfiniteScrollSide
    mode?: TInfiniteScrollMode
    loadMoreText?: string
    emptyText?: string
    margin?: string
}

export interface IInfiniteScrollIntersectProps extends ICommonsComponentProps {
    side?: TInfiniteScrollSide
    rootRef: HTMLElement
    margin?: string
}
