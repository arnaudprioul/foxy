<template>
  <component
    :is="tag"
    :class="tableClasses"
    :style="tableStyles">
    <slot name="top"/>

    <div
      :class="tableWrapperClasses"
      :style="tableWrapperStyles">
      <slot name="wrapper">
        <table>
          <slot name="default"/>
        </table>
      </slot>
    </div>

    <slot name="bottom"/>
  </component>
</template>

<script lang="ts" setup>
  import {
    useBorder,
    useDensity,
    useDimension,
    useElevation,
    useMargin,
    usePadding,
    useRounded,
    useSlots
  } from '@foxy/composables'
  import { DENSITY } from '@foxy/enums'

  import { ITableProps } from '@foxy/interfaces'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<ITableProps>(), {
    tag: 'div',
    density: DENSITY.DEFAULT
  })

  const { hasSlot } = useSlots()

  const { densityClasses } = useDensity(props)
  const { dimensionStyles } = useDimension(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { roundedStyles, roundedClasses } = useRounded(props)
  const { elevationClasses } = useElevation(props)
  const { paddingStyles, paddingClasses } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)

  // CLASS & STYLES

  const tableStyles = computed(() => {
    return [
      borderStyles.value,
      roundedStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style
    ] as StyleValue
  })
  const tableClasses = computed(() => {
    return [
      'foxy-table',
      {
        'foxy-table--fixed-header': props.fixedHeader,
        'foxy-table--fixed-footer': props.fixedFooter,
        'foxy-table--has-top': hasSlot('top'),
        'foxy-table--has-bottom': hasSlot('bottom')
      },
      densityClasses.value,
      borderClasses.value,
      roundedClasses.value,
      elevationClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class,
    ]
  })
  const tableWrapperStyles = computed(() => {
    return [
      dimensionStyles.value,
      props.style
    ] as StyleValue
  })
  const tableWrapperClasses = computed(() => {
    return [
      'foxy-table__wrapper',
      props.class,
    ]
  })
</script>
