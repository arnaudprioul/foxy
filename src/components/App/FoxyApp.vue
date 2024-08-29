<template>
  <foxy-layout
      ref="appRef"
      :id="id"
      :class="appClasses"
      :style="appStyles">
    <template #default>
      <slot name="default"/>
    </template>
  </foxy-layout>
</template>

<script lang="ts" setup>
  import { computed, StyleValue } from 'vue'

  import { ILayoutProps } from '@foxy/interfaces'

  import { FoxyLayout } from '@foxy/components'

  const props = withDefaults(defineProps<ILayoutProps>(), { fullHeight: true })

  const appStyles = computed(() => {
    return [props.style] as StyleValue
  })
  const appClasses = computed(() => {
    return ['foxy-app', props.class]
  })
</script>
