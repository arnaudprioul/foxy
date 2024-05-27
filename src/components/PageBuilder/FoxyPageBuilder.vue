<template>
  <foxy-layout
      ref="pageBuilderRef"
      :class="pageBuilderClasses"
      :style="pageBuilderStyles">
    <template #default>
      <slot name="default"/>
    </template>
  </foxy-layout>
</template>

<script lang="ts" setup>
  import { FoxyLayout } from '@foxy/components'

  import { ILayoutProps } from '@foxy/interfaces'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<ILayoutProps>(), { fullHeight: true })

  const pageBuilderStyles = computed(() => {
    return [props.style] as StyleValue
  })
  const pageBuilderClasses = computed(() => {
    return ['foxy-page-builder', props.class]
  })
</script>
