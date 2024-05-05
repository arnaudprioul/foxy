import { onBeforeUnmount, readonly, ref, watch } from 'vue'

import { IN_BROWSER } from '@foxy/consts'

import { IResizeState } from '@foxy/interfaces'

import { refElement } from '@foxy/utils'

export function useResizeObserver (callback?: ResizeObserverCallback, box: 'content' | 'border' = 'content'): IResizeState {
  const resizeRef = ref<HTMLElement>()
  const contentRect = ref<DOMRectReadOnly>()

  if (IN_BROWSER) {
    const observer = new ResizeObserver((entries: Array<ResizeObserverEntry>) => {
      callback?.(entries, observer)

      if (!entries.length) return

      if (box === 'content') {
        contentRect.value = entries[0].contentRect
      } else {
        contentRect.value = entries[0].target.getBoundingClientRect()
      }
    })

    onBeforeUnmount(() => {
      observer.disconnect()
    })

    watch(resizeRef, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(refElement(oldValue) as Element)
        contentRect.value = undefined
      }

      if (newValue) observer.observe(refElement(newValue) as Element)
    }, {
      flush: 'post',
    })
  }

  return {
    resizeRef,
    contentRect: readonly(contentRect),
  }
}
