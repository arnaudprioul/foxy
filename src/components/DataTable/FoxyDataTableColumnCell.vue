<template>
  <component
    :id="tag"
    :class="dataTableColumnClasses"
    :style="dataTableColumnStyles">
    <slot name="default"/>
  </component>
</template>

<script lang="ts" setup>
  import { useDimension, usePadding } from '@foxy/composables'

  import { ALIGN } from '@foxy/enums'

  import { IDataTableColumnProps } from '@foxy/interfaces'

  import { convertToUnit } from '@foxy/utils'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IDataTableColumnProps>(), {
    align: ALIGN.START,
    tag: 'td'
  })

  const { dimensionStyles } = useDimension(props)
  const { paddingStyles, paddingClasses } = usePadding(props)

  // CLASSES && STYLES

  const dataTableColumnClasses = computed(() => {
    return [
      'foxy-data-table-cell',
      `foxy-data-table-cell--align-${props.align}`,
      {
        'foxy-data-table-cell--fixed': props.fixed,
        'foxy-data-table-cell--last-fixed': props.lastFixed,
        'foxy-data-table-cell--nowrap': props.nowrap,
      },
      paddingClasses.value,
    ]
  })
  const dataTableColumnStyles = computed(() => {
    return [
      paddingStyles.value,
      dimensionStyles.value,
      {
        left: convertToUnit(props.fixedOffset || null),
      }
    ] as StyleValue
  })
</script>
