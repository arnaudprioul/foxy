import { useProxiedModel } from '@foxy/composables'
import { IFocusProps } from '@foxy/interfaces'

import { getCurrentInstanceName } from '@foxy/utils'

import { computed } from 'vue'

export function useFocus (props: IFocusProps, name = getCurrentInstanceName()) {
  const isFocused = useProxiedModel(props, 'focused')
  const focusClasses = computed(() => {
    return ({
      [`${name}--focused`]: isFocused.value,
    })
  })

  const onFocus = () => {
    isFocused.value = true
  }
  const onBlur = () => {
    isFocused.value = false
  }

  return { focusClasses, isFocused, onFocus, onBlur }
}