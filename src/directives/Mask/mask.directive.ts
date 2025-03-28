import { IMaskDirectiveBinding, IMaskHtmlElement } from '@foxy/interfaces'

import { isMaskEnabled, maskRemoveListeners, queryInputElementInside, updateMask } from '@foxy/utils'

export const Mask = {
  beforeMount:(el: IMaskHtmlElement, binding: IMaskDirectiveBinding) => {
    el = queryInputElementInside(el);

    updateMask(el, binding, instanceMaskReplacers);
    updateValue(el);
  },
  unmounted: (el: IMaskHtmlElement) => {
    delete el._mask
    maskRemoveListeners(el)
  },
  updated: (el: IMaskHtmlElement, binding: IMaskDirectiveBinding) => {
    el = queryInputElementInside(el);

    const isMaskChanged = isFunction(value)
        || maskToString(oldValue) !== maskToString(value);

    if (isMaskChanged) {
      updateMask(el, value, instanceMaskReplacers);
    }

    updateValue(el, isMaskChanged);
  }
}

export default Mask
