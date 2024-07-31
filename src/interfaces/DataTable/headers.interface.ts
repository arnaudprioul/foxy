import { IColorProps, IDataTableItem, IDisplayProps, ILoaderProps } from '@foxy/interfaces'

import {
  TAlign,
  TDataTableCompareFunction,
  TDataTableHeaderCell,
  TFilterFunction,
  TIcon,
  TSelectItemKey
} from '@foxy/types'

export interface IDataTableHeadersProps extends IColorProps, IDisplayProps, ILoaderProps {
  sticky?: boolean,
  disableSort?: boolean,
  multiSort?: boolean,
  sortAscIcon?: TIcon
  sortDescIcon?: TIcon
  headerProps?: Record<string, any>
}

export interface IDataTableHeaderProps {
  headers?: Array<IDataTableHeader>
  items?: Array<IDataTableItem>
}

export interface IDataTableHeader<T = Record<string, any>> {
  key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {})
  value?: TSelectItemKey<T>
  title?: string

  fixed?: boolean
  align?: Record<string, TAlign>

  width?: number | string
  minWidth?: string
  maxWidth?: string
  nowrap?: boolean

  headerProps?: Record<string, any>
  cellProps?: TDataTableHeaderCell

  sortable?: boolean
  sort?: TDataTableCompareFunction
  sortRaw?: TDataTableCompareFunction
  filter?: TFilterFunction

  mobile?: boolean

  children?: Array<IDataTableHeader<T>>
}

export interface IInternalDataTableHeader extends Omit<IDataTableHeader, 'key' | 'value' | 'children'> {
  key: string | null
  value: TSelectItemKey | null

  sortable: boolean
  fixedOffset?: number
  lastFixed?: boolean
  nowrap?: boolean
  colspan?: number
  rowspan?: number

  children?: Array<IInternalDataTableHeader>
}