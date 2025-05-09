import type { IHoverProps } from "@foxy/interfaces"

import { getCurrentInstanceName } from "@foxy/utils"

import type { Ref } from "vue"
import { computed, isRef, shallowRef } from "vue"

export function useHover (props: IHoverProps | Ref<boolean | { class: string }>, name = getCurrentInstanceName()) {
    const isHover = shallowRef(false)

    const hoverClasses = computed(() => {
        const hover = isRef(props) ? props.value : props.hover
        const classes: Array<string> = []

        if (isHover.value) {
            if (hover === true) {
                classes.push(`${name}--hovered`)
            }

            if (typeof hover === 'object' && hover.class.length > 1) {
                classes.push(hover.class)
            }
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
