<template>
  <component
      :is="tag"
      :class="spacerClasses"
      :style="spacerStyles">
    <slot name="default"/>
  </component>
</template>

<script lang="ts" setup>
  import { useProps } from "@foxy/composables"
  import { ISpacerProps } from '@foxy/interfaces'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<ISpacerProps>(), { tag: 'div' })

  const {filterProps} = useProps<ISpacerProps>(props)

  // CLASSES & STYLES

  const spacerStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const spacerClasses = computed(() => {
    return [
      'foxy-spacer',
      props.class,
    ]
  })

  // EXPOSE

  defineExpose({
	  filterProps
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
