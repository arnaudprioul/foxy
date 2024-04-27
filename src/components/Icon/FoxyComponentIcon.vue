<template>
  <component :is="tag" :class="iconClasses" :style="iconStyles">
    <slot name="default">
      <component :is="iconComponent" v-if="hasIcon"/>
    </slot>
  </component>
</template>

<script lang="ts" setup>
  import type { Component } from 'vue'
  import { computed, StyleValue } from 'vue'

  import { IIconProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<IIconProps>(), { tag: 'div' })

  const hasIcon = computed(() => {
    return !!props.icon
  })
  const iconComponent = computed(() => {
    return props.icon as Component
  })

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
