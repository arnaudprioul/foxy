import type { IElevationProps } from '@foxy/interfaces'
import { formatElevationStyle, getCurrentInstanceName } from "@foxy/utils"
import { computed, isRef, ref, Ref } from 'vue'

export function useElevation (props: IElevationProps | Ref<number | string | undefined>, flat: Ref<boolean> = ref(false), name = getCurrentInstanceName()) {
    const elevationClasses = computed(() => {
        const elevation = isRef(props) ? props.value : props.elevation
        const classes: Array<string> = []

        if (elevation == null || flat.value) return classes

        classes.push(`${name}--elevated`)

        return classes
    })

    const elevationStyles = computed(() => {
        const elevation = isRef(props) ? props.value : props.elevation
        const styles: Array<string> = []

        if (elevation == null || flat.value) return []

        styles.push(formatElevationStyle(parseInt(elevation, 10)))

        return styles
    })

    return {elevationClasses, elevationStyles}
}
