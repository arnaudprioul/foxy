<template>
  <component :is="tag" :class="iconClasses" :style="iconStyles">
    {{ icon }}
  </component>
</template>

<script lang="ts" setup>
  import { computed, StyleValue } from 'vue'

  import { IIconComponentProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<IIconComponentProps>(), { tag: 'div' })

  // CLASS & STYLES

  const iconStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const iconClasses = computed(() => {
    return [
      props.class
    ]
  })
</script>
