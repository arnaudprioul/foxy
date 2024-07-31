import { useVModel } from '@foxy/composables'
import { FOXY_DATA_TABLE_PAGINATION_KEY } from '@foxy/consts'

import { IDataTableGroup, IDataTablePaginationProps, IDataTableProvidePagination } from '@foxy/interfaces'
import { clamp, getCurrentInstance } from '@foxy/utils'
import { computed, provide, Ref, watch, watchEffect } from 'vue'

export function createPagination (props: IDataTablePaginationProps) {
  const page = useVModel(props, 'page', undefined, value => +(value ?? 1))
  const itemsPerPage = useVModel(props, 'itemsPerPage', undefined, value => +(value ?? 10))

  return { page, itemsPerPage }
}

export function providePagination (options: {
  page: Ref<number>
  itemsPerPage: Ref<number>
  itemsLength: Ref<number>
}): IDataTableProvidePagination {
  const { page, itemsPerPage, itemsLength } = options

  const startIndex = computed(() => {
    if (itemsPerPage.value === -1) return 0

    return itemsPerPage.value * (page.value - 1)
  })
  const stopIndex = computed(() => {
    if (itemsPerPage.value === -1) return itemsLength.value

    return Math.min(itemsLength.value, startIndex.value + itemsPerPage.value)
  })
  const pageCount = computed(() => {
    if (itemsPerPage.value === -1 || itemsLength.value === 0) return 1

    return Math.ceil(itemsLength.value / itemsPerPage.value)
  })

  watchEffect(() => {
    if (page.value > pageCount.value) {
      page.value = pageCount.value
    }
  })

  const setItemsPerPage = (value: number) => {
    itemsPerPage.value = value
    page.value = 1
  }
  const nextPage = () => {
    page.value = clamp(page.value + 1, 1, pageCount.value)
  }
  const prevPage = () => {
    page.value = clamp(page.value - 1, 1, pageCount.value)
  }
  const setPage = (value: number) => {
    page.value = clamp(value, 1, pageCount.value)
  }

  const data: IDataTableProvidePagination = {
    page,
    itemsPerPage,
    startIndex,
    stopIndex,
    pageCount,
    itemsLength,
    nextPage,
    prevPage,
    setPage,
    setItemsPerPage
  }

  provide(FOXY_DATA_TABLE_PAGINATION_KEY, data)

  return data
}

export function usePaginatedItems<T> (options: {
  items: Ref<readonly (T | IDataTableGroup<T>)[]>
  startIndex: Ref<number>
  stopIndex: Ref<number>
  itemsPerPage: Ref<number>
}) {
  const vm = getCurrentInstance('usePaginatedItems')

  const { items, startIndex, stopIndex, itemsPerPage } = options
  const paginatedItems = computed(() => {
    if (itemsPerPage.value <= 0) return items.value

    return items.value.slice(startIndex.value, stopIndex.value)
  })

  watch(paginatedItems, (val) => {
    vm.emit('update:currentItems', val)
  })

  return { paginatedItems }
}