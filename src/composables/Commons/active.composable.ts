import { useVModel } from "@foxy/composables"
import type { IActiveProps } from "@foxy/interfaces"

import { getCurrentInstanceName } from "@foxy/utils"

import { computed } from "vue"

export function useActive (props: IActiveProps, name = getCurrentInstanceName()) {
    const isActive = useVModel(props, 'active', false)

    const activeClasses = computed(() => {
        const classes: Array<string> = []

        if (isActive.value) {
            classes.push(`${name}--active`)
        }

        return classes
    })

    const onClick = () => {
        isActive.value = !isActive.value
    }

    return {
        isActive,
        activeClasses,
        onClick
    }
}
