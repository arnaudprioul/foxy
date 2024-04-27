<template>
  <component
      :is="tag"
      :class="rowClasses"
      :style="rowStyles">
    <slot name="default"/>
  </component>
</template>

<script lang="ts" setup>
  import { ISpacerProps } from '@foxy/interfaces'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<ISpacerProps>(), { tag: 'div' })

  // CLASS & STYLES

  const rowStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const rowClasses = computed(() => {
    return [
      'foxy-spacer',
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-spacer {
    flex-grow: var(--foxy-spacer---flex-grow);
  }
</style>

<style>
  :root {
    --foxy-spacer---flex-grow: 1;
  }
</style>
