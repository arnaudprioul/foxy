import type { ILoaderProps } from '@origam/interfaces'

import { getCurrentInstanceName } from '@origam/utils'

import { computed } from 'vue'

export function useLoader (props: ILoaderProps, name = getCurrentInstanceName()) {
    const loaderClasses = computed(() => ({
        [`${name}--loading`]: props.loading
    }))

    return {loaderClasses}
}
