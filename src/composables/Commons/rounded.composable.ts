import { BORDER_RADIUS_REGEX } from '@foxy/consts'

import type { IRoundedProps } from '@foxy/interfaces'

import { convertToUnit, formatRoundedStylesVar, getCurrentInstanceName } from '@foxy/utils'

import { computed, isRef, Ref } from 'vue'

export function useRounded (props: IRoundedProps | Ref<boolean | number | string | null | undefined>, name = getCurrentInstanceName()) {

    const roundedClasses = computed(() => {
        const rounded = isRef(props) ? props.value : props.rounded
        const classes: Array<string> = []

        if (rounded === true || rounded === '') {
            classes.push(`${name}--rounded`)
        }

        return classes
    })

    const roundedStyles = computed(() => {
        const rounded = isRef(props) ? props.value : props.rounded
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
