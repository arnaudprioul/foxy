import { STATUS_POSITION } from "@foxy/enums"
import type { IAdjacentProps, IStatusProps } from "@foxy/interfaces"
import { getCurrentInstanceName } from '@foxy/utils'
import { computed } from 'vue'

export function useStatus (props: IStatusProps & IAdjacentProps, name = getCurrentInstanceName()) {
    const statusIcon = computed(() => {
        return `$${props.status}`
    })

    const prependIcon = computed(() => {
        if (!props.status || (Boolean(props.statusIconPosition) && ![`${STATUS_POSITION.PREPEND}`, `${STATUS_POSITION.BOTH}`].includes(props.statusIconPosition as string)) || props.prependIcon) return props.prependIcon

        return statusIcon.value
    })
    const appendIcon = computed(() => {
        if (!props.status || (props.statusIconPosition && ![`${STATUS_POSITION.APPEND}`, `${STATUS_POSITION.BOTH}`].includes(props.statusIconPosition)) || props.appendIcon) return props.appendIcon

        return statusIcon.value
    })
    const icon = computed(() => {
        if (!props.status || !props.statusIconPosition || props.statusIconPosition !== 'replace' || props.icon) return props.icon

        return statusIcon.value
    })

    const statusClasses = computed(() => {
        const classes: Array<string> = []

        if (props.status) {
            classes.push(`${name}--${props.status}`)
        }

        return classes
    })

    return {icon, appendIcon, prependIcon, statusClasses}
}
