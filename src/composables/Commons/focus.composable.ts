import { useVModel } from '@foxui/composables'
import type { IFocusProps } from '@foxui/interfaces'

import { getCurrentInstanceName } from '@foxui/utils'

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
