import { computed } from 'vue'
import type { ILoaderProps } from '../../interfaces'

import { getCurrentInstanceName } from '../../utils'

export function useLoader (props: ILoaderProps, name = getCurrentInstanceName()) {
    const loaderClasses = computed(() => ({
        [`${name}--loading`]: props.loading
    }))

    return {loaderClasses}
}
