import { SUPPORTS_INTERSECTION } from '@foxy/consts'
import { IObserveDirectiveBinding } from '@foxy/interfaces'
import { unmountIntersect } from '@foxy/utils'

export const Intersect = {
  mounted (el: HTMLElement, binding: IObserveDirectiveBinding) {
    if (!SUPPORTS_INTERSECTION) return

    const modifiers = binding.modifiers || {}
    const value = binding.value
    const { handler, options } = typeof value === 'object'
        ? value
        : { handler: value, options: {} }

    const observer = new IntersectionObserver((
        entries: IntersectionObserverEntry[] = [],
        observer: IntersectionObserver
    ) => {
      const _observe = el._observe?.[binding.instance!.$.uid]
      if (!_observe) return // Just in case, should never fire

      const isIntersecting = entries.some(entry => entry.isIntersecting)

      // If is not quiet or has already been
      // initted, invoke the user callback
      if (
          handler && (
              !modifiers.quiet ||
              _observe.init
          ) && (
              !modifiers.once ||
              isIntersecting ||
              _observe.init
          )
      ) {
        handler(isIntersecting, entries, observer)
      }

      if (isIntersecting && modifiers.once) unmountIntersect(el, binding)
      else _observe.init = true
    }, options)

    el._observe = Object(el._observe)
    el._observe![binding.instance!.$.uid] = { init: false, observer }

    observer.observe(el)
  },
  unmounted (el: HTMLElement, binding: IObserveDirectiveBinding) {
    unmountIntersect(el, binding)
  },
}

export default Intersect