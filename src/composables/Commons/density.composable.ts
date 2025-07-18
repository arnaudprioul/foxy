import { PREDIFINED_DENSITY } from '@origam/consts'

import type { IDensityProps } from '@origam/interfaces'

import type { TDensity } from '@origam/types'

import { getCurrentInstanceName } from '@origam/utils'
import { computed, isRef, Ref } from 'vue'

export function useDensity (props: IDensityProps | Ref<number | string | undefined>, name = getCurrentInstanceName()) {
    const densityClasses = computed(() => {
        const density = isRef(props) ? props.value : props.density
        const classes: Array<string> = []

        if (density == null) return classes

        if (density && PREDIFINED_DENSITY.includes(density as TDensity)) {
            classes.push(`${name}--density-${density}`)
        }

        return classes
    })

    return {densityClasses}
}
