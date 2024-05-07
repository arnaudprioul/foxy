import { IPositionProps } from '@foxy/interfaces'

import { getCurrentInstanceName } from '@foxy/utils'
import { computed } from 'vue'

export function usePosition (props: IPositionProps, name = getCurrentInstanceName()) {
  const positionClasses = computed(() => {
    return props.position ? `${name}--${props.position}` : undefined
  })

  return { positionClasses }
}