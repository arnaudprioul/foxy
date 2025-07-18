import { useVModel } from '@origam/composables'
import type { IFocusProps } from '@origam/interfaces'

import { getCurrentInstanceName } from '@origam/utils'

import { computed } from 'vue'

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
