import { useDisplay } from '@foxy/composables'
import { IN_BROWSER } from '@foxy/consts'

import { onMounted, shallowRef } from 'vue'

export function useHydration () {
    if (!IN_BROWSER) return shallowRef(false)

    const {ssr} = useDisplay()

    if (ssr) {
        const isMounted = shallowRef(false)
        onMounted(() => {
            isMounted.value = true
        })
        return isMounted
    } else {
        return shallowRef(true)
    }
}
