import { useVModel } from "@origam/composables"
import { IActiveProps } from "@origam/interfaces"

import { getCurrentInstanceName } from "@origam/utils"

import { computed } from "vue"

export function useActive (props: IActiveProps & Record<string, any>, prop = 'active', name = getCurrentInstanceName()) {
    const isActive = useVModel(props, prop as keyof typeof props)

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
