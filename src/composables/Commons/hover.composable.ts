import { useVModel } from "@foxy/composables"
import type { IHoverProps } from "@foxy/interfaces"

import { getCurrentInstanceName } from "@foxy/utils"

import { computed } from "vue"

export function useHover (props: IHoverProps, name = getCurrentInstanceName()) {
    const isHover = useVModel(props, 'hover', false)

    const hoverClasses = computed(() => {
        const classes: Array<string> = []

        if (isHover.value) {
            classes.push(`${name}--hovered`)
        }

        return classes
    })

    const onMouseenter = () => {
        isHover.value = true
    }
    const onMouseleave = () => {
        isHover.value = false
    }

    return {
        isHover,
        hoverClasses,
        onMouseenter,
        onMouseleave
    }
}
