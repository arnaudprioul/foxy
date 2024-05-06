import { IFocusProps } from '@foxy/interfaces'
import { getCurrentInstanceName, useProxiedModel } from '@foxy/utils'
import { computed } from 'vue'

export function useFocus (props: IFocusProps, name = getCurrentInstanceName()) {
  const isFocused = useProxiedModel(props, 'focused')
  const focusClasses = computed(() => {
    return ({
      [`${name}--focused`]: isFocused.value,
    })
  })

  const focus = () => {
    isFocused.value = true
  }
  const blur = () => {
    isFocused.value = false
  }

  return { focusClasses, isFocused, focus, blur }
}