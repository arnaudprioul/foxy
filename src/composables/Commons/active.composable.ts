import { useVModel } from "@foxy/composables"

import { getCurrentInstanceName } from "@foxy/utils"

import { computed } from "vue"

export function useActive (props: Record<string, any>, prop = 'active', name = getCurrentInstanceName()) {
    const isActive = useVModel(props, prop as keyof typeof props, false)

    const activeClasses = computed(() => {
        const classes: Array<string> = []

        if (isActive.value) {
            classes.push(`${name}--active`)
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
