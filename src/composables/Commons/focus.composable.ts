import { computed } from 'vue'
import { useVModel } from '../../composables'
import type { IFocusProps } from '../../interfaces'

import { getCurrentInstanceName } from '../../utils'

export function useFocus (props: IFocusProps, name = getCurrentInstanceName()) {
    const isFocused = useVModel(props, 'focused')
    const focusClasses = computed(() => {
        return ({
            [`${name}--focused`]: isFocused.value
        })
    })

    const onFocus = () => {
        isFocused.value = true
    }
    const onBlur = () => {
        isFocused.value = false
    }

    return {focusClasses, isFocused, onFocus, onBlur}
}
