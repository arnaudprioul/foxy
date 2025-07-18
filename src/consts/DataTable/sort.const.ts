import type { IDataTableSortItem, IInternalDataTableHeader } from '@foxui/interfaces'

import type { InjectionKey, Ref } from 'vue'

export const FOXUI_DATA_TABLE_SORT_KEY: InjectionKey<{
    sortBy: Ref<Array<IDataTableSortItem>>
    toggleSort: (column: IInternalDataTableHeader) => void
    isSorted: (column: IInternalDataTableHeader) => boolean
}> = Symbol.for('foxui:data-table-sort')
