import { computed, isRef, ref, Ref } from 'vue'
import type { IElevationProps } from '../../interfaces'
import { TColor } from "../../types"
import { formatElevationStyle, getCurrentInstanceName } from "../../utils"

export function useElevation (props: IElevationProps | Ref<number | string | undefined>, flat: Ref<boolean> = ref(false), bgColor: Ref<TColor> = ref('rgb(0,0,0)'), name = getCurrentInstanceName()) {
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

        styles.push(formatElevationStyle(parseInt(elevation, 10), bgColor.value))

        return styles
    })

    return {elevationClasses, elevationStyles}
}
