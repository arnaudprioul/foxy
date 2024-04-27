<template>
  <component :is="tag" :class="iconClasses" :style="iconStyles"/>
</template>

<script lang="ts" setup>
  import { convertToUnit } from '@foxy/utils'
  import { computed, StyleValue } from 'vue'

  import { IIconProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<IIconProps>(), { tag: 'i' })

  // CLASS & STYLES

  const iconStyles = computed(() => {
    return [
      {
        'font-size': props.size ? convertToUnit(props.size) : undefined,
        'line-height': props.size ? convertToUnit(props.size) : undefined
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
