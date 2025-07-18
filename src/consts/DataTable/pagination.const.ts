import type { InjectionKey, Ref } from 'vue'

export const FOXY_DATA_TABLE_PAGINATION_KEY: InjectionKey<{
    page: Ref<number>
    itemsPerPage: Ref<number>
    startIndex: Ref<number>
    stopIndex: Ref<number>
    pageCount: Ref<number>
    itemsLength: Ref<number>
    prevPage: () => void
    nextPage: () => void
    setPage: (value: number) => void
    setItemsPerPage: (value: number) => void
}> = Symbol.for('foxy:data-table-pagination')
