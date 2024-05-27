<template>
  <component :is="tag" :class="iconClasses" :style="iconStyles"/>
</template>

<script lang="ts" setup>
  import { IIconComponentProps } from '@foxy/interfaces'

  import { convertToUnit } from '@foxy/utils'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IIconComponentProps>(), { tag: 'i' })

  // CLASS & STYLES

  const iconStyles = computed(() => {
    return [
      {
        'font-size': props.size && typeof props.size === 'number' ? convertToUnit(props.size) : undefined,
        'line-height': props.size && typeof props.size === 'number' ? convertToUnit(props.size) : undefined
      },
      props.style
    ] as StyleValue
  })
  const iconClasses = computed(() => {
    return [
      props.icon,
      props.class
    ]
  })
</script>
