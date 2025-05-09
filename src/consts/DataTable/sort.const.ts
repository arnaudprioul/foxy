import type { IDataTableSortItem, IInternalDataTableHeader } from '@foxy/interfaces'

import type { InjectionKey, Ref } from 'vue'

export const FOXY_DATA_TABLE_SORT_KEY: InjectionKey<{
    sortBy: Ref<Array<IDataTableSortItem>>
    toggleSort: (column: IInternalDataTableHeader) => void
    isSorted: (column: IInternalDataTableHeader) => boolean
}> = Symbol.for('foxy:data-table-sort')
