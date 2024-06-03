import { BORDER_REGEX } from '@foxy/consts'

import { IBorderProps } from '@foxy/interfaces'

import { convertToUnit, formatBorderStylesVar, getCurrentInstanceName } from '@foxy/utils'
import { computed, isRef, Ref } from 'vue'

// TODO Create composable for border position
export function useBorder (props: IBorderProps | Ref<boolean | number | string | null | undefined>, name = getCurrentInstanceName()) {
  const borderClasses = computed(() => {
    const border = isRef(props) ? props.value : props.border
    const classes: Array<string> = []

    if (border === true || border === '') {
      classes.push(`${name}--bordered`)
    }

    return classes
  })

  const borderStyles = computed(() => {
    const border = isRef(props) ? props.value : props.border
    const styles: Array<string> = []

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
