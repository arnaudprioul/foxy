<template>
  <component
      :is="tag"
      :class="activatorClasses"
      :style="activatorStyles">
    <slot name="default"/>
  </component>
</template>

<script lang="ts" setup>
  import { useNestedGroupActivator } from '@foxy/composables'

  import { IListActivatorProps } from '@foxy/interfaces'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IListActivatorProps>(), { tag: 'div' })

  useNestedGroupActivator()

  // CLASS & STYLES

  const activatorStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const activatorClasses = computed(() => {
    return [
      'foxy-list-group-activator',
      props.class
    ]
  })
</script>
