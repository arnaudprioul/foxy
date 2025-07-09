import { useVModel } from "@foxy/composables"
import { IActiveProps } from "@foxy/interfaces"

import { getCurrentInstanceName } from "@foxy/utils"

import { computed } from "vue"

export function useActive (props: IActiveProps & Record<string, any>, prop = 'active', name = getCurrentInstanceName()) {
    const isActive = useVModel(props, prop as keyof typeof props, false)

    const activeClasses = computed(() => {
        const classes: Array<string> = []

        if (isActive.value) {
            classes.push(`${name}--active`)

            if (props.activeClass) {
                classes.push(props.activeClass)
            }
        }

        return classes
    })

    const onActive = () => {
        isActive.value = !isActive.value
    }

    return {
        isActive,
        activeClasses,
        onActive
    }
}
