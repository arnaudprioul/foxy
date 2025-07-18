import { provideSelection } from '@origam/composables'
import type { IDataTableSelectStrategy } from '@origam/interfaces'

import type { InjectionKey } from 'vue'

export const ORIGAM_DATA_TABLE_SELECT_KEY: InjectionKey<ReturnType<typeof provideSelection>> = Symbol.for('origam:data-table-selection')

export const singleSelectStrategy: IDataTableSelectStrategy = {
    showSelectAll: false,
    allSelected: () => [],
    select: ({items, value}) => {
        return new Set(value ? [items[0]?.value] : [])
    },
    selectAll: ({selected}) => selected
}

export const pageSelectStrategy: IDataTableSelectStrategy = {
    showSelectAll: true,
    allSelected: ({currentPage}) => currentPage,
    select: ({items, value, selected}) => {
        for (const item of items) {
            if (value) selected.add(item.value)
            else selected.delete(item.value)
        }

        return selected
    },
    selectAll: ({value, currentPage, selected}) => pageSelectStrategy.select({items: currentPage, value, selected})
}

export const allSelectStrategy: IDataTableSelectStrategy = {
    showSelectAll: true,
    allSelected: ({allItems}) => allItems,
    select: ({items, value, selected}) => {
        for (const item of items) {
            if (value) selected.add(item.value)
            else selected.delete(item.value)
        }

        return selected
    },
    selectAll: ({value, allItems, selected}) => allSelectStrategy.select({items: allItems, value, selected})
}
