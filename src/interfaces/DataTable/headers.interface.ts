import { ALIGN } from '@foxy/enums'
import {
  IColorProps,
  ICommonsComponentProps,
  IDataTableItem,
  IDataTableSortItem,
  IDisplayProps,
  ILoaderProps
} from '@foxy/interfaces'

import {
  TAlign,
  TDataTableCompareFunction,
  TDataTableHeaderCell,
  TFilterFunction,
  TIcon,
  TSelectItemKey
} from '@foxy/types'
import { ComputedRef, Ref, UnwrapRef } from 'vue'

export interface IHeaderCellProps extends ICommonsComponentProps, IColorProps {
  disableSort?: boolean
  headerProps?: any
  sticky?: boolean
  multiSort?: boolean
  sortAscIcon?: TIcon
  sortDescIcon?: TIcon
}

export interface IDataTableHeadersProps extends ICommonsComponentProps, IColorProps, IDisplayProps, ILoaderProps, IHeaderCellProps {

}

export interface IDataTableHeadersCellMobileProps extends ICommonsComponentProps, IHeaderCellProps, IColorProps {
  columns: Array<IInternalDataTableHeader>
  colspan?: number
}

export interface IDataTableHeadersCellProps extends ICommonsComponentProps, IColorProps, IHeaderCellProps {
  headers: Array<Array<IInternalDataTableHeader>>
}

export interface IDataTableHeaderCellProps extends ICommonsComponentProps, IHeaderCellProps, IColorProps {
  column: IInternalDataTableHeader
  x: number
  y: number
}

export interface IDataTableHeadersSlotProps {
  headers: Array<Array<IInternalDataTableHeader>>
  columns: Array<IInternalDataTableHeader>
  sortBy: UnwrapRef<Ref<Array<IDataTableSortItem>>>
  someSelected: UnwrapRef<ComputedRef<boolean>>
  allSelected: UnwrapRef<ComputedRef<boolean>>
  toggleSort: (column: IInternalDataTableHeader) => void
  selectAll: (value: boolean) => void
  getSortIcon: (column: IInternalDataTableHeader) => TIcon
  isSorted: (column: IInternalDataTableHeader) => boolean
}

export interface IDataTableHeaderProps {
  headers?: Array<IDataTableHeader>
  items?: Array<IDataTableItem>
}

export interface IDataTableHeader<T = any> {
  key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {})
  value?: TSelectItemKey<T>
  title?: string

  fixed?: boolean
  align?: Omit<TAlign, ALIGN.BASELINE | ALIGN.STRETCH>

  width?: number | string
  minWidth?: string
  maxWidth?: string
  nowrap?: boolean

  headerProps?: any
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
  padding?: string | number
  colspan?: number
  rowspan?: number

  children?: Array<IInternalDataTableHeader>
}
