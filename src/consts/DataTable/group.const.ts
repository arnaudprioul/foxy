import type { IDataTableGroup, IDataTableItem, IDataTableSortItem } from '@foxui/interfaces'

import type { InjectionKey, Ref } from 'vue'

export const FOXUI_DATA_TABLE_GROUP_KEY: InjectionKey<{
    opened: Ref<Set<string>>
    toggleGroup: (group: IDataTableGroup) => void
    isGroupOpen: (group: IDataTableGroup) => boolean
    sortByWithGroups: Ref<Array<IDataTableSortItem>>
    groupBy: Ref<Array<IDataTableSortItem>>
    extractRows: (items: Array<IDataTableItem | IDataTableGroup<IDataTableItem>>) => Array<IDataTableItem>
}> = Symbol.for('foxui:data-table-group')
