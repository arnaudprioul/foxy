import type { IElevationProps } from '@foxy/interfaces'
import { computed, isRef, Ref } from 'vue'

export function useElevation (props: IElevationProps | Ref<number | string | undefined>) {
    const elevationClasses = computed(() => {
        const elevation = isRef(props) ? props.value : props.elevation
        const classes: Array<string> = []

        if (elevation == null) return classes

        classes.push(`elevation-${elevation}`)

        return classes
    })

    return {elevationClasses}
}
