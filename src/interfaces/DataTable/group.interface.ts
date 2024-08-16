import {
  IDataTableItem,
  IDataTableItemBase,
  IDataTableSelectableItem,
  IDataTableSortItem,
  IInternalDataTableHeader
} from '@foxy/interfaces'
import { ComputedRef, Ref } from 'vue'

export interface IDataTableGroupProps {
  groupBy?: Array<IDataTableSortItem>
}

export interface IDataTableGroupableItem<T = any> {
  type: 'item'
  raw: T
}

export interface IDataTableGroup<T = any> {
  type: 'group'
  depth: number
  id: string
  key: string
  value: any
  items: Array<(T | IDataTableGroup<T>)>
}

export interface IDataTableProvideGroup {
  sortByWithGroups: ComputedRef<Array<IDataTableSortItem>>
  toggleGroup: (group: IDataTableGroup) => void
  opened: Ref<Set<string> & Omit<Set<string>, keyof Set<any>>>
  groupBy: Ref<Array<IDataTableSortItem>>
  extractRows: (items: Array<IDataTableGroupableItem | IDataTableGroup<IDataTableGroupableItem>>) => Array<IDataTableGroupableItem>
  isGroupOpen: (group: IDataTableGroup) => boolean
}

export interface IDataTableGroupHeaderSlot<T = IDataTableGroup> extends IDataTableItemBase<T> {
  index: number
  item: T
  columns: IInternalDataTableHeader[]
  isExpanded: (item: IDataTableItem) => boolean
  toggleExpand: (item: IDataTableItem) => void
  isSelected: (items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean
  toggleSelect: (item: IDataTableSelectableItem) => void
  toggleGroup: (group: IDataTableGroup) => void
  isGroupOpen: (group: IDataTableGroup) => boolean
}