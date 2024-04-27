import { computed, isRef, Ref } from 'vue'

import { PREDIFINED_DENSITY } from '@foxy/consts'

import { IDensityProps } from '@foxy/interfaces'

import { TDensity } from '@foxy/types'

import { getCurrentInstanceName } from '@foxy/utils'

export function useDensity (props: IDensityProps | Ref<number | string | undefined>, name = getCurrentInstanceName()) {
  const densityClasses = computed(() => {
    const density = isRef(props) ? props.value : props.density
    const classes: string[] = []

    if (density == null) return classes

    if (density && PREDIFINED_DENSITY.includes(density as TDensity)) {
      classes.push(`${name}--density-${density}`)
    }

    return classes
  })

  return { densityClasses }
}