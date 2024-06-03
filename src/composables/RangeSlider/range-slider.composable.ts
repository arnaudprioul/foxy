import { FOXY_RANGE_SLIDER_KEY } from '@foxy/consts'

import { BLOCK, CLIENT_POSITION, DIMENSIONS, DIRECTION, INLINE } from '@foxy/enums'

import { IRangeSlider, IRangeSliderProps, IRangeSliderProvide } from '@foxy/interfaces'

import { TFoxyRangeSliderTrack, TTick } from '@foxy/types'

import { clamp, createRange, getDecimals, getPosition, getRangeSliderOffset } from '@foxy/utils'

import { computed, provide, ref, shallowRef, toRef } from 'vue'

export function useSteps (props: IRangeSliderProps) {
  const min = computed(() => {
    return parseFloat(props.min ?? 0)
  })
  const max = computed(() => {
    return parseFloat(props.max ?? 100)
  })
  const step = computed(() => {
    const step = props.step ?? 0

    return +step > 0 ? parseFloat(step) : 0
  })
  const decimals = computed(() => {
    return Math.max(getDecimals(step.value), getDecimals(min.value))
  })

  const roundValue = (value: string | number) => {
    value = parseFloat(value)

    if (step.value <= 0) return value

    const clamped = clamp(value, min.value, max.value)
    const offset = min.value % step.value
    const newValue = Math.round((clamped - offset) / step.value) * step.value + offset

    return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value))
  }

  return { min, max, step, decimals, roundValue }
}

export function useRangeSlider ({
                                  props,
                                  steps,
                                  onSliderStart,
                                  onSliderMove,
                                  onSliderEnd,
                                  getActiveThumb
                                }: IRangeSlider) {
  const isReversed = toRef(props, 'reverse')

  const isVertical = computed(() => {
    return props.direction === DIRECTION.VERTICAL
  })
  const indexFromEnd = computed(() => {
    return isVertical.value !== isReversed.value
  })

  const { min, max, step, decimals, roundValue } = steps

  // TODO - need rework to use thumb object | trick object | track object

  const tickSize = computed(() => {
    if (typeof props.ticksProps?.size === 'number') {
      return parseInt(props.ticksProps.size, 10)
    }

    return 2
  })
  const showTicks = ref(props.ticksProps?.show)
  const ticks = ref(props.ticksProps?.items)
  const numTicks = computed(() => {
    return (max.value - min.value) / step.value
  })
  const parsedTicks = computed<Array<TTick>>(() => {
    if (!showTicks.value) return []

    if (!ticks.value) {
      return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map((t) => {
        const value = min.value + (t * step.value)

        return {
          value,
          position: position(value),
        }
      }) : []
    }

    if (Array.isArray(ticks.value)) return ticks.value.map((t) => ({
      value: t,
      position: position(t),
      label: t.toString()
    }))

    return Object.keys(ticks.value).map((key) => ({
      value: parseFloat(key),
      position: position(parseFloat(key)),
      label: (ticks.value as Record<string, string>)[key],
    }))
  })
  const hasTicksLabels = computed(() => {
    return parsedTicks.value.some(({ label }) => !!label)
  })

  const disabled = toRef(props, 'disabled')
  const readonly = toRef(props, 'readonly')
  const error = toRef(props, 'error')

  const color = toRef(props, 'color')
  const bgColor = toRef(props, 'bgColor')
  const hoverColor = toRef(props, 'hoverColor')
  const hoverBgColor = toRef(props, 'hoverBgColor')
  const activeColor = toRef(props, 'activeColor')
  const activeBgColor = toRef(props, 'activeBgColor')

  const elevation = toRef(props, 'elevation')
  const rounded = toRef(props, 'rounded')
  const border = toRef(props, 'border')
  const ripple = toRef(props, 'ripple')

  const trackContainerRef = ref<TFoxyRangeSliderTrack | undefined>()
  const activeThumbRef = ref<HTMLElement | undefined>()

  const mousePressed = shallowRef(false)
  const startOffset = shallowRef(0)

  const parseMouseMove = (e: MouseEvent | TouchEvent): number => {
    const start = isVertical.value ? BLOCK.TOP : INLINE.LEFT
    const length = isVertical.value ? DIMENSIONS.HEIGHT : DIMENSIONS.WIDTH
    const position = isVertical.value ? CLIENT_POSITION.Y : CLIENT_POSITION.X

    const {
      [start]: trackStart,
      [length]: trackLength,
    } = trackContainerRef.value?.$el.getBoundingClientRect()
    const clickOffset = getPosition(e, position)

    // It is possible for left to be NaN, force to number
    let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0

    if (isVertical.value ? indexFromEnd.value : !indexFromEnd.value) clickPos = 1 - clickPos

    return roundValue(min.value + clickPos * (max.value - min.value))
  }
  const handleStop = (e: MouseEvent | TouchEvent) => {
    onSliderEnd({ value: parseMouseMove(e) })

    mousePressed.value = false
    startOffset.value = 0
  }
  const handleStart = (e: MouseEvent | TouchEvent) => {
    activeThumbRef.value = getActiveThumb(e)

    if (!activeThumbRef.value) return

    activeThumbRef.value.focus()
    mousePressed.value = true

    if (activeThumbRef.value.contains(e.target as Node)) {
      startOffset.value = getRangeSliderOffset(e, activeThumbRef.value, props.direction ?? DIRECTION.VERTICAL)
    } else {
      startOffset.value = 0
      onSliderMove({ value: parseMouseMove(e) })
    }

    onSliderStart({ value: parseMouseMove(e) })
  }

  const moveListenerOptions = { passive: true, capture: true }

  const onMouseMove = (e: MouseEvent | TouchEvent) => {
    onSliderMove({ value: parseMouseMove(e) })
  }
  const onSliderMouseUp = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    handleStop(e)

    window.removeEventListener('mousemove', onMouseMove, moveListenerOptions)
    window.removeEventListener('mouseup', onSliderMouseUp)
  }
  const onSliderTouchend = (e: TouchEvent) => {
    handleStop(e)

    window.removeEventListener('touchmove', onMouseMove, moveListenerOptions)
    e.target?.removeEventListener('touchend', onSliderTouchend as EventListener)
  }
  const onSliderTouchstart = (e: TouchEvent) => {
    handleStart(e)

    window.addEventListener('touchmove', onMouseMove, moveListenerOptions)
    e.target?.addEventListener('touchend', onSliderTouchend as EventListener, { passive: false })
  }
  const onSliderMousedown = (e: MouseEvent) => {
    e.preventDefault()

    handleStart(e)

    window.addEventListener('mousemove', onMouseMove, moveListenerOptions)
    window.addEventListener('mouseup', onSliderMouseUp, { passive: false })
  }
  const position = (val: number) => {
    const percentage = (val - min.value) / (max.value - min.value) * 100

    return clamp(isNaN(percentage) ? 0 : percentage, 0, 100)
  }

  const data: IRangeSliderProvide = {
    activeThumbRef,
    decimals,
    disabled,
    readonly,
    color,
    hoverColor,
    activeColor,
    bgColor,
    hoverBgColor,
    activeBgColor,
    error,
    elevation,
    rounded,
    border,
    ripple,
    hasLabels: hasTicksLabels,
    isReversed,
    indexFromEnd,
    min,
    max,
    mousePressed,
    numTicks,
    onSliderMousedown,
    onSliderTouchstart,
    parsedTicks,
    parseMouseMove,
    position,
    roundValue,
    showTicks,
    startOffset,
    step,
    ticks,
    tickSize,
    trackContainerRef,
    isVertical,
  }

  provide(FOXY_RANGE_SLIDER_KEY, data)

  return data
}
