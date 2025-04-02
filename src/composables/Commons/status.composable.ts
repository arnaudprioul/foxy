import { IStatusProps } from '@foxy/interfaces'

import { getCurrentInstanceName } from '@foxy/utils'
import { computed, isRef } from 'vue'

export function useStatus (props: IStatusProps, name = getCurrentInstanceName()) {
  const icon = computed(() => {
    if (!props.status) return props.icon

    return typeof props.icon === 'string' ? props.icon : `$${props.status}`
  })

  const statusClasses = computed(() => {
    const status = isRef(props) ? props.value : props.status
    const classes: Array<string> = []

    if(status) {
      classes.push(`${name}--${status}`)
    }

    return classes
  })

  return { icon, statusClasses }
}
