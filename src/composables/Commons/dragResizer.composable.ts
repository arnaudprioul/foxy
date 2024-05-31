import { useEventListener } from '@foxy/composables'

import { AXIS } from '@foxy/enums'

import { TAxis } from '@foxy/types'

import { addWindowListener, clamp } from '@foxy/utils'

import { computed, onUnmounted, Ref, ref } from 'vue'

export function useDragResizer (el: HTMLElement | undefined, value: Ref<number>, min: number, max: number, axis: TAxis) {
  const resizing = ref(false)

  const removeListeners: Array<any> = []
  const onUnmountedCleanupFns: Array<any> = []

  onUnmounted(() => {
    onUnmountedCleanupFns.forEach((fn) => fn())
  })

  const isHorizontal = computed(() => {
    return axis === AXIS.X
  })
  const isVertical = computed(() => {
    return axis === AXIS.Y
  })

  // TODO - Rework for both axis

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const start = isHorizontal.value ? e.clientX : e.clientY
    const initialStart = value.value

    resizing.value = true

    const onMouseMove = (e: MouseEvent) => {
      const delta = (isHorizontal.value ? e.clientX : e.clientY) - start

      value.value = clamp(initialStart + delta, min, max)
    }
    const onMouseUp = () => {
      removeListeners.forEach((fn) => fn())

      resizing.value = false
    }

    removeListeners.push(...[
      addWindowListener('mousemove', onMouseMove as (e: Event) => void, onUnmountedCleanupFns),
      addWindowListener('mouseup', onMouseUp, onUnmountedCleanupFns)
    ])
  }
  const onTouchStart = (e: TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const start = isHorizontal.value ? e.touches[0].clientX : e.touches[0].clientY
    const initialStart = value.value

    resizing.value = true

    const onTouchMove = (e: TouchEvent) => {
      const delta = (isHorizontal.value ? e.touches[0].clientX : e.touches[0].clientY) - start

      value.value = Math.max(min, Math.min(max, initialStart + delta))
    }
    const onTouchEnd = () => {
      removeListeners.forEach((fn) => fn())

      resizing.value = false
    }

    removeListeners.push(...[
      addWindowListener('touchmove', onTouchMove as (e: Event) => void, onUnmountedCleanupFns),
      addWindowListener('touchend touchcancel', onTouchEnd, onUnmountedCleanupFns),
    ])
  }

  if (el) {
    useEventListener(el, 'mousedown', onMouseDown)
    useEventListener(el, 'touchstart', onTouchStart)
  }
}