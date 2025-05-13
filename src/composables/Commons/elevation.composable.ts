import type { IElevationProps } from '@foxy/interfaces'
import { getCurrentInstanceName } from "@foxy/utils"
import { computed, isRef, Ref } from 'vue'

export function useElevation (props: IElevationProps | Ref<number | string | undefined>, name = getCurrentInstanceName()) {
    const elevationClasses = computed(() => {
        const elevation = isRef(props) ? props.value : props.elevation
        const classes: Array<string> = []

        if (elevation == null) return classes

        classes.push(`${name}--elevated`)

        return classes
    })

    return {elevationClasses}
}
