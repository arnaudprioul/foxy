import { computed, isRef, Ref } from 'vue'
import { BORDER_REGEX, DIRECTION_ARRAY } from '../../consts'

import type { IBorderProps } from '../../interfaces'
import { TDirectionBoth } from "../../types"

import { convertToUnit, formatBorderStylesVar, getCurrentInstanceName, isEmpty } from '../../utils'

// TODO Create composable for border position
export function useBorder (props: IBorderProps | Ref<boolean | number | string | TDirectionBoth | Array<TDirectionBoth> | null | undefined>, name = getCurrentInstanceName()) {
    const borderClasses = computed(() => {
        const border = isRef(props) ? props.value : props.border
        const classes: Array<string> = []

        if (border && typeof border !== 'undefined') {
            classes.push(`${name}--border`)

            if (DIRECTION_ARRAY.includes(border as TDirectionBoth) || (Array.isArray(border) && border.some((bord) => DIRECTION_ARRAY.includes(bord)))) {
                classes.push(`${name}--border-${border}`)
            }
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
                    let values = String(match[key]).split(' ')

                    if (key === 'style' && isEmpty(match[key])) values = ['solid']

                    if (key === 'color' && isEmpty(match[key])) values = ['currentColor']

                    styles.push(...formatBorderStylesVar(values, key))
                })
            }
        } else if (typeof border === 'number') {
            styles.push(`border-width: ${convertToUnit(border)}`)
        }

        return styles
    })

    return {borderClasses, borderStyles}
}
