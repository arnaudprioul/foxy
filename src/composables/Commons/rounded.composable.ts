import { BORDER_RADIUS_REGEX } from '@foxy/consts'

import { IRoundedProps } from '@foxy/interfaces'

import { convertToUnit, formatRoundedStylesVar, getCurrentInstanceName } from '@foxy/utils'

import { computed } from 'vue'

export function useRounded (props: IRoundedProps, name = getCurrentInstanceName()) {

  const roundedClasses = computed(() => {
    const rounded = props.rounded
    const classes: Array<string> = []

    if (rounded === true || rounded === '') {
      classes.push(`${name}--rounded`)
    }

    return classes
  })

  const roundedStyles = computed(() => {
    const rounded = props.rounded
    const styles: Array<string> = []

    if (typeof rounded === 'string' && rounded !== '') {
      const match = BORDER_RADIUS_REGEX.exec(rounded)?.groups
      if (match) {
        Object.keys(match).forEach((key) => {
          const values = String(match[key]).split(' ')

          styles.push(...formatRoundedStylesVar(values))
        })
      }
    } else if (typeof rounded === 'number') {
      styles.push(`border-radius: ${convertToUnit(rounded)}`)
    }

    return styles
  })

  return {
    roundedClasses,
    roundedStyles
  }
}