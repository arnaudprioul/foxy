import { computed, isRef } from 'vue'

import { SIZES_ARRAY } from '@foxy/consts'

import { ISizeProps } from '@foxy/interfaces'

import { TSize } from '@foxy/types'

import { convertToUnit, getCurrentInstanceName } from '@foxy/utils'

export function useSize (props: ISizeProps, name = getCurrentInstanceName()) {
  const sizeClasses = computed(() => {
    const size = isRef(props) ? props.value : props.size
    const classes = []

    if (size && SIZES_ARRAY.includes(size as TSize)) {
      classes.push(`${name}--size-${size}`)
    }

    return classes
  })

  const sizeStyles = computed(() => {
    const styles = []

    if (props.size && !SIZES_ARRAY.includes(props.size as TSize)) {
      styles.push(`width': ${convertToUnit(props.size)}`)
      styles.push(`height': ${convertToUnit(props.size)}`)
    }

    return styles
  })

  return { sizeStyles, sizeClasses }
}