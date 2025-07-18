import { useIntersectionObserver, useMargin, usePadding, useVModel } from '@foxui/composables'

import type { IProgressTypeProps } from '@foxui/interfaces'

import { int } from "@foxui/utils"

import { computed, useSlots } from 'vue'

export function useProgress (props: IProgressTypeProps) {
    const progress = useVModel(props, 'modelValue')
    const slots = useSlots()
    const {isIntersecting} = useIntersectionObserver()
    const {paddingClasses, paddingStyles} = usePadding(props)
    const {marginClasses, marginStyles} = useMargin(props)

    const thickness = computed(() => {
        return Number(props.thickness)
    })
    const max = computed(() => int(props.max as string))
    const normalizedValue = computed(() => {
        return parseFloat(progress.value as string) / max.value * 100
    })
    const hasContent = computed(() => {
        return slots.default
    })

    const progressClasses = computed(() => {
        return [
            'foxui-progress',
            {
                'foxui-progress--indeterminate': props.indeterminate,
                'foxui-progress--visible': isIntersecting.value,
                'foxui-progress--active': props.active,
                'foxui-progress--striped': props.striped,
                'foxui-progress--absolute': props.absolute
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

    return {progressClasses, progressStyles, normalizedValue, thickness, max, progress, hasContent}
}
