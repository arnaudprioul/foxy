import { DIMENSIONS_ARRAY } from '@/consts'

import type { IDimensionProps } from '@/interfaces'

import { convertToUnit, toKebabCase } from '@/utils'

import { computed } from 'vue'

export function useDimension (props: IDimensionProps) {
    const dimensionStyles = computed(() => {
        const dimensions: Array<string> = []

        DIMENSIONS_ARRAY.forEach((dimension) => {
            if (props[dimension]) {
                dimensions.push(`${toKebabCase(dimension)}: ${convertToUnit(props[dimension])}`)
            }
        })

        return dimensions
    })

    return {dimensionStyles}
}
