import { computed } from 'vue'
import { PADDING_REGEX } from '../../consts'

import type { IPaddingProps } from '../../interfaces'

import { convertToUnit, formatPaddingStylesVar, getCurrentInstanceName } from '../../utils'

export function usePadding (props: IPaddingProps, name = getCurrentInstanceName()) {

    const paddingClasses = computed(() => {
        const padding = props.padding
        const classes: Array<string> = []

        if (padding === true || padding === '') {
            classes.push(`${name}--padded`)
        }

        return classes
    })

    const paddingStyles = computed(() => {
        const padding = props.padding
        const styles: Array<string> = []

        if (typeof padding === 'string' && padding !== '') {
            const match = PADDING_REGEX.exec(padding)?.groups
            if (match) {
                Object.keys(match).forEach((key) => {
                    const values = String(match[key]).split(' ')

                    styles.push(...formatPaddingStylesVar(values))
                })
            }
        } else if (typeof padding === 'number') {
            styles.push(`padding: ${convertToUnit(padding)}`)
        }

        return styles
    })

    return {
        paddingClasses,
        paddingStyles
    }
}
