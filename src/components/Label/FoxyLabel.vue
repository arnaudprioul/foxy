<template>
  <label
      :class="labelClasses"
      :style="labelStyles"
      @click="props.onClick"
  >
    <slot name="default">
      {{ props.text }}
    </slot>
  </label>
</template>

<script lang="ts" setup>
  import { useBorder, useBothColor, useMargin, usePadding, useRounded } from '@foxy/composables'

  import { ILabelProps } from '@foxy/interfaces'

  import { computed, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<ILabelProps>(), {})

  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

  // CLASS & STYLES

  const labelStyles = computed(() => {
    return [
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      colorStyles.value,
      props.style
    ] as StyleValue
  })
  const labelClasses = computed(() => {
    return [
      'foxy-label',
      {
        'foxy-label--clickable': !!props.onClick,
      },
      roundedClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class,
    ]
  })
</script>
