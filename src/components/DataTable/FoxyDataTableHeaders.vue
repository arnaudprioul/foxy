<template>
  <template v-if="loading">
    <tr class="foxy-data-table-headers__row foxy-data-table-headers__row--progress">
      <th :colspan="columns.length" class="foxy-data-table-headers__cell">
        <slot name="loader">
          <foxy-progress
            :color="color"
            :type="PROGRESS_TYPE.LINEAR"
            absolute
            active
            class="foxy-card__progress foxy-card__progress--linear"
            indeterminate
            thickness="4"
          />
        </slot>
      </th>
    </tr>
  </template>
  <template v-else>
    <template v-if="mobile">
      <slot name="mobile" v-bind="slotProps">
        <foxy-data-table-headers-cell-mobile
          :class="dataTableHeadersClasses"
          :columns="columns"
          :style="dataTableHeadersStyles"
          v-bind="dataTableHeaderCellProps"/>
      </slot>
    </template>
    <template v-else>
      <slot name="default" v-bind="slotProps">
        <foxy-data-table-headers-cell
          :class="dataTableHeadersClasses"
          :headers="headers"
          :style="dataTableHeadersStyles"
          v-bind="dataTableHeaderCellProps"/>
      </slot>
    </template>
  </template>
</template>

<script lang="ts" setup>
  import { FoxyDataTableHeadersCell, FoxyDataTableHeadersCellMobile, FoxyProgress } from '@foxy/components'

  import { useDisplay, useHeaders, useHeadersCell, useLoader, useSelection, useSort } from '@foxy/composables'

  import { DATA_TABLE_HEADER_CELL_PROPS } from '@foxy/consts'

  import { PROGRESS_TYPE } from '@foxy/enums'

  import { IDataTableHeadersProps, IDataTableHeadersSlotProps } from '@foxy/interfaces'

  import { keys, omit, pick } from '@foxy/utils'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IDataTableHeadersProps>(), {})

  const { toggleSort, sortBy, isSorted } = useSort()
  const { someSelected, allSelected, selectAll } = useSelection()
  const { columns, headers } = useHeaders()
  const { loaderClasses } = useLoader(props)
  const { getSortIcon } = useHeadersCell(props)

  const { displayClasses, mobile } = useDisplay(props)

  const slotProps = computed(() => {
    return {
      headers: headers.value,
      columns: columns.value,
      toggleSort,
      isSorted,
      sortBy: sortBy.value,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      selectAll,
      getSortIcon
    } satisfies IDataTableHeadersSlotProps
  })

  const dataTableHeaderCellProps = computed(() => {
    return omit(pick(props, keys(DATA_TABLE_HEADER_CELL_PROPS)), ['class', 'id'])
  })

  // CLASS & STYLES

  const dataTableHeadersClasses = computed(() => {
    return [
      'foxy-data-table-headers__cell',
      {
        'foxy-data-table-headers__cell--sticky': props.sticky,
      },
      displayClasses.value,
      loaderClasses.value,
      props.class
    ]
  })
  const dataTableHeadersStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
</script>
