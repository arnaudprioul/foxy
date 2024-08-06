import { ILoaderProps } from '@foxy/interfaces'

import { getCurrentInstanceName } from '@foxy/utils'

import { computed } from 'vue'

export function useLoader (props: ILoaderProps, name = getCurrentInstanceName()) {
  const loaderClasses = computed(() => ({
    [`${name}--loading`]: props.loading,
  }))

  return { loaderClasses }
}