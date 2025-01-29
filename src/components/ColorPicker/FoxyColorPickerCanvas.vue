<template>
  <div
      ref="resizeRef"
      :class="colorPickerCanvasClasses"
      :style="colorPickerCanvasStyles"
      @mousedown="handleMouseDown"
      @touchstart.passive="handleMouseDown"
  >
    <canvas
        ref="canvasRef"
        :height="canvasHeight"
        :width="canvasWidth"
    />
    <template v-if="colorHsv">
      <div
          :class="{'foxy-color-picker-canvas__dot--disabled': disabled}"
          :style="dotStyles"
          class="foxy-color-picker-canvas__dot"
      />
    </template>
  </div>
</template>

<script
    lang="ts"
    setup
>
  import { useProps, useResizeObserver } from "@foxy/composables"

  import { IColorPickerCanvasProps } from "@foxy/interfaces"

  import { clamp, convertToUnit, getEventCoordinates } from "@foxy/utils"

  import { computed, onMounted, ref, shallowRef, StyleValue, watch } from "vue"

  const props = withDefaults(defineProps<IColorPickerCanvasProps>(), {
    height: 150
  })

  const emits = defineEmits(['update:colorHsv'])

  const { filterProps } = useProps<IColorPickerCanvasProps>(props)

  const isInteracting = shallowRef(false)
  const canvasRef = ref<HTMLCanvasElement | null>()
  const canvasWidth = shallowRef(parseFloat(props.width as string))
  const canvasHeight = shallowRef(parseFloat(props.height as string))

  const _dotPosition = ref({ x: 0, y: 0 })
  const dotPosition = computed({
    get: () => _dotPosition.value,
    set (val) {
      if (!canvasRef.value) return

      const { x, y } = val
      _dotPosition.value = val

      emits('update:colorHsv', {
        h: props.colorHsv?.h ?? 0,
        s: clamp(x, 0, canvasWidth.value) / canvasWidth.value,
        v: 1 - clamp(y, 0, canvasHeight.value) / canvasHeight.value,
        a: props.colorHsv?.a ?? 1
      })
    }
  })

  const dotStyles = computed(() => {
    const { x, y } = dotPosition.value
    const radius = parseInt(props.dotSize as string, 10) / 2

    return {
      width: convertToUnit(props.dotSize),
      height: convertToUnit(props.dotSize),
      transform: `translate(${convertToUnit(x - radius)}, ${convertToUnit(y - radius)})`
    }
  })

  const { resizeRef } = useResizeObserver((entries) => {
    if (!resizeRef.el?.offsetParent) return

    const { width, height } = entries[0].contentRect

    canvasWidth.value = width
    canvasHeight.value = height
  })

  const updateDotPosition = (x: number, y: number, rect: DOMRect) => {
    const { left, top, width, height } = rect

    dotPosition.value = {
      x: clamp(x - left, 0, width),
      y: clamp(y - top, 0, height)
    }
  }

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    if (e.type === 'mousedown') {
      // Prevent text selection while dragging
      e.preventDefault()
    }

    if (props.disabled) return

    handleMouseMove(e)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleMouseMove)
    window.addEventListener('touchend', handleMouseUp)
  }
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (props.disabled || !canvasRef.value) return

    isInteracting.value = true

    const coords = getEventCoordinates(e)

    updateDotPosition(coords.clientX, coords.clientY, canvasRef.value.getBoundingClientRect())
  }
  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('touchmove', handleMouseMove)
    window.removeEventListener('touchend', handleMouseUp)
  }

  const updateCanvas = () => {
    if (!canvasRef.value) return

    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)

    saturationGradient.addColorStop(0, 'hsla(0, 0%, 100%, 1)') // white
    saturationGradient.addColorStop(1, `hsla(${props.colorHsv?.h ?? 0}, 100%, 50%, 1)`)

    ctx.fillStyle = saturationGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)

    valueGradient.addColorStop(0, 'hsla(0, 0%, 0%, 0)') // transparent
    valueGradient.addColorStop(1, 'hsla(0, 0%, 0%, 1)') // black

    ctx.fillStyle = valueGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  watch(() => props.colorHsv?.h, updateCanvas, { immediate: true })
  watch(() => [canvasWidth.value, canvasHeight.value], (newVal, oldVal) => {
    updateCanvas()
    _dotPosition.value = {
      x: dotPosition.value.x * newVal[0] / oldVal[0],
      y: dotPosition.value.y * newVal[1] / oldVal[1]
    }
  }, { flush: 'post' })
  watch(() => props.colorHsv, () => {
    if (isInteracting.value) {
      isInteracting.value = false
      return
    }

    _dotPosition.value = props.colorHsv ? {
      x: props.colorHsv.s * canvasWidth.value,
      y: (1 - props.colorHsv.v) * canvasHeight.value
    } : { x: 0, y: 0 }
  }, { deep: true, immediate: true })

  onMounted(() => {
    updateCanvas()
  })

  // CLASS & STYLES

  const colorPickerCanvasStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const colorPickerCanvasClasses = computed(() => {
    return [
      'foxy-color-picker-canvas',
      props.class
    ]
  })

  // EXPOSE

  defineExpose({
    filterProps
  })

</script>

<style
    lang="scss"
    scoped
>

</style>