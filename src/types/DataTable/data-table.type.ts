import { DATATABLE_SELECT_STRATEGY } from '@foxy/enums'

import { IDataTableItem, IInternalDataTableHeader } from '@foxy/interfaces'

export type TDataTableCompareFunction<T = any> = (a: T, b: T) => number | null

export type TDataTableItemBase<T> = {
  index: number
  item: T
  internalItem: IDataTableItem<T>
  isExpanded: boolean
  toggleExpand: void
  isSelected: boolean
  toggleSelect: void
}

export type TDataTableItemKey<T> = TDataTableItemBase<T> & {
  value: any
  column: IInternalDataTableHeader
}

export type TDataTableHeaderCell =
    | Record<string, any>
    | ((data: Pick<TDataTableItemKey<any>, 'index' | 'item' | 'internalItem' | 'value'>) => Record<string, any>)

export type TDataTableRow<T> =
    | Record<string, any>
    | ((data: Pick<TDataTableItemKey<T>, 'index' | 'item' | 'internalItem'>) => Record<string, any>)

export type TDataTableCell<T> =
    | Record<string, any>
    | ((data: Pick<TDataTableItemKey<T>, 'index' | 'item' | 'internalItem' | 'value' | 'column'>) => Record<string, any>)

export type TDataTableSelectStrategy = `${DATATABLE_SELECT_STRATEGY}`