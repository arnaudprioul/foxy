import { BORDER_REGEX } from '@foxy/consts'

import { IBorderProps } from '@foxy/interfaces'

import { convertToUnit, formatBorderStylesVar, getCurrentInstanceName } from '@foxy/utils'
import { computed, isRef } from 'vue'

export function useBorder (props: IBorderProps, name = getCurrentInstanceName()) {
  const borderClasses = computed(() => {
    const border = isRef(props) ? props.value : props.border
    const classes: string[] = []

    if (border === true || border === '') {
      classes.push(`${name}--bordered`)
    }

    return classes
  })

  const borderStyles = computed(() => {
    const border = isRef(props) ? props.value : props.border
    const styles: string[] = []

    if (typeof border === 'string' && border !== '') {
      const match = BORDER_REGEX.exec(border)?.groups
      if (match) {
        Object.keys(match).forEach((key) => {
          const values = String(match[key]).split(' ')

          styles.push(...formatBorderStylesVar(values, key))
        })
      }
    } else if (typeof border === 'number') {
      styles.push(`border-width: ${convertToUnit(border)}`)
    }

    return styles
  })

  return { borderClasses, borderStyles }
}
