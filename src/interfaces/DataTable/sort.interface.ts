import { IInternalDataTableHeader } from '@foxy/interfaces'
import { TDataTableCompareFunction } from '@foxy/types'
import { Ref } from 'vue'

export interface IDataTableSortProps {
  sortBy?: Array<IDataTableSortItem>
  customKeySort?: Record<string, TDataTableCompareFunction>
  multiSort?: boolean
  mustSort?: boolean
}

export interface IDataTableSortItem {
  key: string,
  order?: boolean | 'asc' | 'desc'
}

export interface IDataTableProvideSort {
  sortBy: Ref<Array<IDataTableSortItem>>
  toggleSort: (column: IInternalDataTableHeader) => void
  isSorted: (column: IInternalDataTableHeader) => boolean
}