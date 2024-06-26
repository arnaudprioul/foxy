<template>
  <hr
      :aria-orientation="dividerOrientation"
      :class="dividerClasses"
      :role="dividerRole"
      :style="dividerStyles"/>
</template>

<script lang="ts" setup>
  import { useMargin } from '@foxy/composables'
  import { DIRECTION } from '@foxy/enums'

  import { IDividerProps } from '@foxy/interfaces'

  import { convertToUnit } from '@foxy/utils'

  import { computed, StyleValue, useAttrs } from 'vue'

  const attrs = useAttrs()

  const props = withDefaults(defineProps<IDividerProps>(), {
    direction: DIRECTION.HORIZONTAL
  })

  const dividerOrientation = computed(() => {
    return !attrs.role || attrs.role === 'separator'
        ? props.direction
        : undefined
  })
  const dividerRole = computed(() => {
    return `${attrs.role || 'separator'}`
  })

  const { marginClasses, marginStyles } = useMargin(props)

  const dividerClasses = computed(() => {
    return [
      'foxy-divider',
      `foxy-divider--${props.direction}`,
      {
        'foxy-divider--inset': props.inset,
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
      styles.push({ [props.direction === DIRECTION.VERTICAL ? '--foxy-divider---max-height' : '--foxy-divider---max-width']: convertToUnit(props.length) })
    }

    if (props.thickness) {
      styles.push({ [props.direction === DIRECTION.VERTICAL ? '--foxy-divider---border-right-width' : '--foxy-divider---border-top-width']: convertToUnit(props.thickness) })
    }

    return styles as StyleValue
  })
</script>
