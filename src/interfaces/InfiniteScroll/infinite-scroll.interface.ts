import { IColorProps, ICommonsComponentProps, IDimensionProps, IDirectionProps, ITagProps } from '@foxy/interfaces'

import { TInfiniteScrollMode, TInfiniteScrollSide } from '@foxy/types'

export interface IInfiniteScrollProps extends ICommonsComponentProps, IColorProps, IDimensionProps, ITagProps, IDirectionProps {
  side?: Record<string, TInfiniteScrollSide>
  mode?: Record<string, TInfiniteScrollMode>
  loadMoreText?: string
  emptyText?: string
  margin?: string
}

export interface IInfiniteScrollIntersectProps extends ICommonsComponentProps {
  side?: Record<string, TInfiniteScrollSide>
  rootRef: HTMLElement
  margin?: string
}