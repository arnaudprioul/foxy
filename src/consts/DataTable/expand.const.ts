import type { IDataTableItem } from '@foxy/interfaces'
import type { InjectionKey, Ref } from 'vue'

export const FOXY_DATA_TABLE_EXPAND_KEY: InjectionKey<{
    expand: (item: IDataTableItem, value: boolean) => void
    expanded: Ref<Set<string>>
    expandOnClick: Ref<boolean | undefined>
    isExpanded: (item: IDataTableItem) => boolean
    toggleExpand: (item: IDataTableItem) => void
}> = Symbol.for('foxy:data-table-expand')
