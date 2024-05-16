<template>
  <label
      :class="labelClasses"
      :style="labelStyles"
      @click="handleClick"
  >
    <slot name="default" v-bind="{text}">
      <span>{{ text }}</span><sup v-if="required">*</sup>
    </slot>
  </label>
</template>

<script lang="ts" setup>
  import { useBorder, useBothColor, useMargin, usePadding, useRounded } from '@foxy/composables'

  import { ILabelProps } from '@foxy/interfaces'

  import { computed, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<ILabelProps>(), {})

  const emits = defineEmits(['click'])

  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

  const handleClick = (e: MouseEvent) => {
    emits('click', e)
  }

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
        'foxy-label--floating': props.floating
      },
      roundedClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>

</style>

<style>
  :root {

  }
</style>