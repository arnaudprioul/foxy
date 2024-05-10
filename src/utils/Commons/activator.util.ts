import { useActivator } from '@foxy/composables'
import { IActivatorProps } from '@foxy/interfaces'
import { bindProps, unbindProps } from '@foxy/utils'
import { ComponentInternalInstance, ComponentPublicInstance, mergeProps, nextTick, onScopeDispose, watch } from 'vue'

export function activator (
    props: IActivatorProps,
    vm: ComponentInternalInstance,
    { activatorEl, activatorEvents }: Pick<ReturnType<typeof useActivator>, 'activatorEl' | 'activatorEvents'>
) {
  watch(() => props.activator, (val, oldVal) => {
    if (oldVal && val !== oldVal) {
      const activator = getActivator(oldVal)
      activator && unbindActivatorProps(activator)
    }
    if (val) {
      nextTick(() => bindActivatorProps())
    }
  }, { immediate: true })

  watch(() => props.activatorProps, () => {
    bindActivatorProps()
  })

  onScopeDispose(() => {
    unbindActivatorProps()
  })

  const bindActivatorProps = (el = getActivator(), _props = props.activatorProps) => {
    if (!el) return
    if (!_props) return

    bindProps(el, mergeProps(activatorEvents.value, _props))
  }

  const unbindActivatorProps = (el = getActivator(), _props = props.activatorProps) => {
    if (!el) return
    if (!_props) return

    unbindProps(el, mergeProps(activatorEvents.value, _props))
  }

  const getActivator = (selector = props.activator): HTMLElement | undefined => {
    const activator = getTargetActivator(selector, vm)

    // The activator should only be a valid element (Ignore comments and text nodes)
    activatorEl.value = activator?.nodeType === Node.ELEMENT_NODE ? activator : undefined

    return activatorEl.value
  }
}

export function getTargetActivator<T extends 'parent' | string | Element | ComponentPublicInstance | [x: number, y: number] | undefined> (
    selector: T,
    vm: ComponentInternalInstance
): HTMLElement | undefined | (T extends Array<any> ? [x: number, y: number] : never) {
  if (!selector) return

  let target
  if (selector === 'parent') {
    let el = vm?.proxy?.$el?.parentNode
    while (el?.hasAttribute('data-no-activator')) {
      el = el.parentNode
    }
    target = el
  } else if (typeof selector === 'string') {
    // Selector
    target = document.querySelector(selector)
  } else if ('$el' in selector) {
    // Component (ref)
    target = selector.$el
  } else {
    // HTMLElement | Element | [x, y]
    target = selector
  }

  return target
}
