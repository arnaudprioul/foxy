<template>
  <component
      :is="tag"
      :class="titleClasses"
      :style="titleStyles">
    <slot v-if="hasContent" name="default">
      {{ text }}
    </slot>
  </component>
</template>

<script lang="ts" setup>
  import { computed, StyleValue, toRef } from 'vue'

  import { useBorder, useBothColor, useDensity, useMargin, usePadding, useSlots } from '@foxy/composables'

  import { ITitleProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<ITitleProps>(), { tag: 'h1' })

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { densityClasses } = useDensity(props)
  const { hasSlot } = useSlots()
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)

  const hasContent = computed(() => {
    return hasSlot('default') || props.text
  })

  // CLASS & STYLES

  const titleStyles = computed(() => {
    return [
      colorStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style
    ] as StyleValue
  })
  const titleClasses = computed(() => {
    return [
      'foxy-title',
      densityClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class
    ]
  })
</script>
