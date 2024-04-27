import { TListItemType } from '@foxy/types'

export interface IListItemChildren {
  items: readonly IInternalListItemChildren[]
  returnObject?: boolean
}

export interface IInternalListItemChildren<T = any> extends IInternalListItem<T> {
  type?: TListItemType
}

export interface IInternalListItem<T = any> extends IInternalItem<T> {
  title?: string
  props?: {
    [key: string]: any
    title?: string
    value?: any
  }
  children?: IInternalListItem<T>[]
}

export interface IInternalItem<T = any> {
  value?: any
  raw: T
}