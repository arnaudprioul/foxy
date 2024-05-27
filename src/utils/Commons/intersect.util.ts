import { IObserveDirectiveBinding } from '@foxy/interfaces'

export function unmountIntersect (el: HTMLElement, binding: IObserveDirectiveBinding) {
  const observe = el._observe?.[binding.instance!.$.uid]
  if (!observe) return

  observe.observer.unobserve(el)
  delete el._observe![binding.instance!.$.uid]
}