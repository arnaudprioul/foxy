import { MARGIN_REGEX } from '@foxy/consts'

import { IMarginProps } from '@foxy/interfaces'

import { convertToUnit, formatMarginStylesVar, getCurrentInstanceName } from '@foxy/utils'

import { computed } from 'vue'

export function useMargin (props: IMarginProps, name = getCurrentInstanceName()) {

  const marginClasses = computed(() => {
    const margin = props.margin
    const classes: Array<string> = []

    if (margin === true || margin === '') {
      classes.push(`${name}--marged`)
    }

    return classes
  })

  const marginStyles = computed(() => {
    const margin = props.margin
    const styles: Array<string> = []

    if (typeof margin === 'string' && margin !== '') {
      const match = MARGIN_REGEX.exec(margin)?.groups
      if (match) {
        Object.keys(match).forEach((key) => {
          const values = String(match[key]).split(' ')

          styles.push(...formatMarginStylesVar(values))
        })
      }
    } else if (typeof margin === 'number') {
      styles.push(`margin: ${convertToUnit(margin)}`)
    }

    return styles
  })

  return {
    marginClasses,
    marginStyles
  }
}