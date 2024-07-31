import { TListItemType } from '@foxy/types'

export interface IListItemChildren {
  items: Array<IInternalListItemChildren>
  returnObject?: boolean
}

export interface IInternalListItemChildren<T = any> extends IInternalListItem<T> {
  type?: Record<string, TListItemType>
}

export interface IInternalListItem<T = any> extends IInternalItem<T> {
  title?: string
  props?: {
    [key: string]: any
    title?: string
    value?: any
  }
  children?: Array<IInternalListItem<T>>
}

export interface IInternalItem<T = any> {
  value?: any
  raw: T
}