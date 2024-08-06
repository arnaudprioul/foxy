<template>
  <foxy-table
    :class="dataTableClasses"
    :style="dataTableStyles"
    v-bind="tableProps">
    <template v-if="hasSlot('top')" #top>
      <slot name="top"/>
    </template>

    <template #default>
      <slot name="default" v-bind="slotProps">
        <slot name="colgroup" v-bind="slotProps"/>

        <template v-if="!props.hideDefaultHeader">
          <thead key="thead">
          <foxy-data-table-headers v-bind="dataTableHeadersProps">
            <template v-if="hasSlot('header')" #default="headerProps">
              <slot name="header" v-bind="headerProps"/>
            </template>

            <template v-if="hasSlot('header.mobile')" #mobile="headerProps">
              <slot name="header.mobile" v-bind="headerProps"/>
            </template>

            <template v-if="hasSlot('header.loader')" #loader="headerLoaderProps">
              <slot name="header.loader" v-bind="headerLoaderProps"/>
            </template>
          </foxy-data-table-headers>
          </thead>
        </template>

        <slot name="thead" v-bind="slotProps"/>

        <template v-if="!props.hideDefaultBody">
          <tbody>
          <slot name="prepend" v-bind="slotProps"/>
          <slot name="body" v-bind="slotProps">
            <foxy-data-table-rows
              :items="paginatedItems"
              v-bind="{ ...attrs, ...dataTableRowsProps }">
              <!-- TODO SLOT BODY-->
            </foxy-data-table-rows>
          </slot>
          <slot name="append" v-bind="slotProps"/>
          </tbody>
        </template>
      </slot>
    </template>

    <template v-if="hasSlot('bottom')" #bottom>
      <slot name="bottom">
        <template v-if="!props.hideDefaultFooter">
          <foxy-divider/>

          <foxy-data-table-footer v-bind="dataTableFooterProps">
            <!-- TODO SLOT FOOTER-->
          </foxy-data-table-footer>
        </template>
      </slot>
    </template>
  </foxy-table>
</template>

<script lang="ts" setup>
  import { FoxyDataTableHeaders, FoxyDivider, FoxyTable } from '@foxy/components'

  import {
    createGroupBy,
    createHeaders,
    createPagination,
    createSort,
    provideExpanded,
    provideGroupBy,
    providePagination,
    provideSelection,
    provideSort,
    useDataTableItems,
    useFilter,
    useGroupedItems,
    useOptions,
    usePaginatedItems,
    useSlots,
    useSortedItems
  } from '@foxy/composables'

  import { TABLE_PROPS } from '@foxy/consts'

  import { DATATABLE_SELECT_STRATEGY, DENSITY, FILTERS_MODE } from '@foxy/enums'

  import { IDataTableProps } from '@foxy/interfaces'

  import { keys, omit, pick } from '@foxy/utils'

  import { computed, StyleValue, toRef, useAttrs } from 'vue'

  const props = withDefaults(defineProps<IDataTableProps>(), {
    itemValue: 'id',
    selectStrategy: DATATABLE_SELECT_STRATEGY.PAGE,
    sortAscIcon: '$sortAsc',
    sortDescIcon: '$sortDesc',
    page: 1,
    itemsPerPage: 10,
    filterMode: FILTERS_MODE.INTERSECTION,
    prevIcon: '$prev',
    nextIcon: '$next',
    firstIcon: '$first',
    lastIcon: '$last',
    itemsPerPageOptions: [
      { value: 10, title: '10' },
      { value: 25, title: '25' },
      { value: 50, title: '50' },
      { value: 100, title: '100' },
      { value: -1, title: 'all' }
    ],
    tag: 'div',
    density: DENSITY.DEFAULT
  })

  const emits = defineEmits(['update:modelValue', 'update:page', 'update:itemsPerPage', 'update:sortBy', 'update:options', 'update:groupBy', 'update:expanded', 'update:currentItems'])

  const attrs = useAttrs()

  const { groupBy } = createGroupBy(props)
  const { sortBy, multiSort, mustSort } = createSort(props)
  const { page, itemsPerPage } = createPagination(props)

  const {
    columns,
    headers,
    sortFunctions,
    sortRawFunctions,
    filterFunctions,
  } = createHeaders(props, {
    groupBy,
    showSelect: toRef(props, 'showSelect'),
    showExpand: toRef(props, 'showExpand'),
  })

  const { hasSlot } = useSlots()

  const { items } = useDataTableItems(props, columns)

  const search = toRef(props, 'search')
  const { filteredItems } = useFilter(props, items, search, {
    transform: item => item.columns,
    customKeyFilter: filterFunctions,
  })

  const { toggleSort } = provideSort({ sortBy, multiSort, mustSort, page })
  const { sortByWithGroups, opened, extractRows, isGroupOpen, toggleGroup } = provideGroupBy({ groupBy, sortBy })

  const { sortedItems } = useSortedItems(props, filteredItems, sortByWithGroups, {
    transform: item => item.columns,
    sortFunctions,
    sortRawFunctions,
  })
  const { flatItems } = useGroupedItems(sortedItems, groupBy, opened)
  const itemsLength = computed(() => flatItems.value.length)

  const { startIndex, stopIndex, pageCount, setItemsPerPage } = providePagination({ page, itemsPerPage, itemsLength })
  const { paginatedItems } = usePaginatedItems({ items: flatItems, startIndex, stopIndex, itemsPerPage })

  const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value))

  const {
    isSelected,
    select,
    selectAll,
    toggleSelect,
    someSelected,
    allSelected,
  } = provideSelection(props, { allItems: items, currentPage: paginatedItemsWithoutGroups })

  const { isExpanded, toggleExpand } = provideExpanded(props)

  useOptions({
    page,
    itemsPerPage,
    sortBy,
    groupBy,
    search,
  })

  const tableProps = computed(() => {
    return omit(pick(props, keys(TABLE_PROPS)), ['class', 'style'])
  })

  const slotProps = computed(() => {
    return {
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      setItemsPerPage,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: paginatedItemsWithoutGroups.value.map((item) => item.raw),
      internalItems: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
      columns: columns.value,
      headers: headers.value
    }
  })

  // CLASS & STYLES

  const dataTableStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const dataTableClasses = computed(() => {
    return [
      'foxy-data-table',
      {
        'foxy-data-table--show-select': props.showSelect,
        'foxy-data-table--loading': props.loading,
      },
      props.class,
    ]
  })
</script>
