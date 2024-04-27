<template>
  <hr
      :aria-orientation="dividerOrientation"
      :class="dividerClasses"
      :role="dividerRole"
      :style="dividerStyles"/>
</template>

<script lang="ts" setup>
  import { useMargin } from '@foxy/composables'

  import { IDividerProps } from '@foxy/interfaces'

  import { convertToUnit } from '@foxy/utils'

  import { computed, StyleValue, useAttrs } from 'vue'

  const attrs = useAttrs()

  const props = withDefaults(defineProps<IDividerProps>(), {})

  const dividerOrientation = computed(() => {
    return !attrs.role || attrs.role === 'separator'
        ? props.vertical ? 'vertical' : 'horizontal'
        : undefined
  })
  const dividerRole = computed(() => {
    return `${attrs.role || 'separator'}`
  })

  const { marginClasses, marginStyles } = useMargin(props)

  const dividerClasses = computed(() => {
    return [
      'foxy-divider',
      {
        'foxy-divider--inset': props.inset,
        'foxy-divider--vertical': props.vertical,
      },
      marginClasses.value,
      props.class
    ]
  })
  const dividerStyles = computed(() => {
    const styles = [
      marginStyles.value,
      props.style
    ]

    if (props.length) {
      styles.push({ [props.vertical ? '--foxy-divider---max-height' : '--foxy-divider---max-width']: convertToUnit(props.length) })
    }

    if (props.thickness) {
      styles.push({ [props.vertical ? '--foxy-divider---border-right-width' : '--foxy-divider---border-top-width']: convertToUnit(props.thickness) })
    }

    return styles as StyleValue
  })
</script>
