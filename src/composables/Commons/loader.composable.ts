import type { ILoaderProps } from '@/interfaces'

import { getCurrentInstanceName } from '@/utils'

import { computed } from 'vue'

export function useLoader (props: ILoaderProps, name = getCurrentInstanceName()) {
    const loaderClasses = computed(() => ({
        [`${name}--loading`]: props.loading
    }))

    return {loaderClasses}
}
