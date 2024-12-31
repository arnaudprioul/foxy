<template>
  <template v-for="(row, y) in headers">
    <tr class="foxy-data-table-headers">
      <template v-for="(column, x) in row">
        <foxy-data-table-header-cell
          :class="dataTableHeadersCellClasses"
          :column="column"
          :style="dataTableHeadersCellStyles"
          :x="x"
          :y="y"
          v-bind="dataTableHeaderCellProps"
        />
      </template>
    </tr>
  </template>
</template>

<script lang="ts" setup>
  import { FoxyDataTableHeaderCell } from '@foxy/components'

  import { DATA_TABLE_HEADER_CELL_PROPS } from '@foxy/consts'

  import { IDataTableHeadersCellProps } from '@foxy/interfaces'

  import { keys, omit, pick } from '@foxy/utils'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IDataTableHeadersCellProps>(), {})

  const dataTableHeaderCellProps = computed(() => {
    return omit(pick(props, keys(DATA_TABLE_HEADER_CELL_PROPS)), ['class', 'id'])
  })

  // CLASS & STYLES

  const dataTableHeadersCellClasses = computed(() => {
    return [
      props.class
    ]
  })
  const dataTableHeadersCellStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
</script>
