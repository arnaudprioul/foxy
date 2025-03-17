import { useIntersectionObserver, useMargin, usePadding, useSlots, useVModel } from '@foxy/composables'

import { IProgressTypeProps } from '@foxy/interfaces'
import { int } from "@foxy/utils"

import { computed } from 'vue'

export function useProgress (props: IProgressTypeProps) {
    const progress = useVModel(props, 'modelValue')
    const { hasSlot } = useSlots()
    const { isIntersecting } = useIntersectionObserver()
    const { paddingClasses, paddingStyles } = usePadding(props)
    const { marginClasses, marginStyles } = useMargin(props)

    const thickness = computed(() => {
        return Number(props.thickness)
    })
    const max = computed(() => int(props.max as string))
    const normalizedValue = computed(() => {
        return parseFloat(progress.value as string) / max.value * 100
    })
    const hasContent = computed(() => {
        return hasSlot('default')
    })

    const progressClasses = computed(() => {
        return [
            'foxy-progress',
            {
                'foxy-progress--indeterminate': props.indeterminate,
                'foxy-progress--visible': isIntersecting.value,
                'foxy-progress--active': props.active,
                'foxy-progress--striped': props.striped,
                'foxy-progress--absolute': props.absolute
            },
            paddingClasses.value,
            marginClasses.value
        ]
    })

    const progressStyles = computed(() => {
        return [
            paddingStyles.value,
            marginStyles.value
        ]
    })

    return { progressClasses, progressStyles, normalizedValue, thickness, max, progress, hasContent }
}