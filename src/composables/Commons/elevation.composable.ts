import { computed, isRef, Ref } from 'vue'

import { IElevationProps } from '@foxy/interfaces'

export function useElevation (props: IElevationProps | Ref<number | string | undefined>) {
  const elevationClasses = computed(() => {
    const elevation = isRef(props) ? props.value : props.elevation
    const classes: string[] = []

    if (elevation == null) return classes

    classes.push(`elevation-${elevation}`)

    return classes
  })

  return { elevationClasses }
}