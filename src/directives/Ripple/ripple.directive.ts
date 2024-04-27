import { IRippleDirectiveBinding, IRippleHtmlElement } from '@foxy/interfaces'

import { isRippleEnabled, rippleRemoveListeners, updateRipple } from '@foxy/utils'

export const Ripple = {
  mounted: (el: IRippleHtmlElement, binding: IRippleDirectiveBinding) => {
    updateRipple(el, binding, false)
  },
  unmounted: (el: IRippleHtmlElement) => {
    delete el._ripple
    rippleRemoveListeners(el)
  },
  updated: (el: IRippleHtmlElement, binding: IRippleDirectiveBinding) => {
    if (binding.value === binding.oldValue) {
      return
    }

    const wasEnabled = isRippleEnabled(binding.oldValue)
    updateRipple(el, binding, wasEnabled)
  }
}

export default Ripple