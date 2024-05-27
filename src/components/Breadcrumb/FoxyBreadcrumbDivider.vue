<template>
  <component
      :is="tag"
      :class="breadcrumbDividerClasses"
      :style="breadcrumbDividerStyles">
    <slot name="default">
      <template v-if="isIcon">
        <foxy-icon :icon="divider"/>
      </template>
      <template v-else>
        {{ divider }}
      </template>
    </slot>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyIcon } from '@foxy/components'

  import { useBorder, useBothColor, useDensity, useMargin, usePadding, useRounded, useSize } from '@foxy/composables'

  import { MDI_ICONS } from '@foxy/enums'

  import { IBreadcrumbDividerProps } from '@foxy/interfaces'

  import { computed, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IBreadcrumbDividerProps>(), {tag: 'span', divider: '/'})

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { densityClasses } = useDensity(props)
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { sizeStyles, sizeClasses } = useSize(props)

  const isIcon = computed(() => {
    return typeof props.divider !== 'string' || Object.values(MDI_ICONS).includes(props.divider)
  })

  // CLASS & STYLES

  const breadcrumbDividerStyles = computed(() => {
    return [
      colorStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      sizeStyles.value,
      props.style
    ] as StyleValue
  })
  const breadcrumbDividerClasses = computed(() => {
    return [
      'foxy-breadcrumb-divider',
      densityClasses.value,
      roundedClasses.value,
      sizeClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-breadcrumbs-divider {
    display: inline-block;
    vertical-align: middle;

    &--density-default {
      padding-left: 8px;
      padding-right: 8px;
    }

    &--density-compact {
      padding-left: 4px;
      padding-right: 4px;
    }
  }
</style>

<style>
  :root {

  }
</style>