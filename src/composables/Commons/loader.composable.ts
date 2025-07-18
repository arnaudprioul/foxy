import type { ILoaderProps } from '@foxui/interfaces'

import { getCurrentInstanceName } from '@foxui/utils'

import { computed } from 'vue'

export function useLoader (props: ILoaderProps, name = getCurrentInstanceName()) {
    const loaderClasses = computed(() => ({
        [`${name}--loading`]: props.loading
    }))

    return {loaderClasses}
}
