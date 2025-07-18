import type { IHoverProps } from "@origam/interfaces"

import { getCurrentInstanceName } from "@origam/utils"

import { computed, ref, watch } from "vue"

export function useHover (props: IHoverProps, name = getCurrentInstanceName()) {
    const hoverable = ref(false)
    const isHover = ref(false)

    const hoverClasses = computed(() => {
        const classes: Array<string> = []

        if (isHover.value) {
            classes.push(`${name}--hovered`)
        }

        return classes
    })

    const onMouseenter = () => {
        if (hoverable.value) {
            isHover.value = true
        }
    }
    const onMouseleave = () => {
        if (hoverable.value) {
            isHover.value = false
        }
    }

    watch(() => props.hover, () => {
        if (props.hover) {
            hoverable.value = true
        }
    }, {immediate: true})

    return {
        isHover,
        hoverClasses,
        onMouseenter,
        onMouseleave
    }
}
