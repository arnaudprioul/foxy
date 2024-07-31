import { IDataTableGroupableItem, IInternalItem, ISelectableItem } from '@foxy/interfaces'

import { TDataTableCell, TDataTableRow, TSelectItemKey } from '@foxy/types'

export interface IDataTableItemsProps {
  items?: Array<IDataTableItem>
  itemValue?: TSelectItemKey
  itemSelectable?: TSelectItemKey
  rowProps?: TDataTableRow<any>
  cellProps?: TDataTableCell<any>
  returnObject?: boolean
}

export interface IDataTableItem<T = any> extends IInternalItem<T>, IDataTableGroupableItem<T>, ISelectableItem {
  key: any
  index: number
  columns: {
    [key: string]: any
  }
}