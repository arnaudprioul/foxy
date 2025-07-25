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
					:class="{'origam-color-picker-canvas__dot--disabled': disabled}"
					:style="dotStyles"
					class="origam-color-picker-canvas__dot"
			/>
		</template>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { useProps, useResizeObserver } from "../../composables"

	import type { IColorPickerCanvasProps } from "../../interfaces"

	import { clamp, convertToUnit, getEventCoordinates, int } from "../../utils"

	import { computed, onMounted, ref, shallowRef, StyleValue, watch } from "vue"

	const props = withDefaults(defineProps<IColorPickerCanvasProps>(), {
		height: 150,
		width: '100%'
	})

	const emits = defineEmits(['update:colorHsv'])

	const {filterProps} = useProps<IColorPickerCanvasProps>(props)

	const isInteracting = shallowRef(false)
	const canvasRef = ref<HTMLCanvasElement | null>()

	const {resizeRef} = useResizeObserver((entries: ResizeObserverEntry[]) => {
		if (!resizeRef.value?.offsetParent) return

		const {width, height} = entries[0].contentRect

		canvasWidth.value = width
		canvasHeight.value = height
	})

	const _canvasHeight = ref(0)
	const canvasHeight = computed({
		get: () => _canvasHeight.value,
		set: (value: number | string) => {
			if (value as string === '100%') {
				_canvasHeight.value = parseFloat(resizeRef.value?.clientHeight || 0)
			} else {
				_canvasHeight.value = parseFloat(value as string)
			}
		}
	})
	const _canvasWidth = ref(0)
	const canvasWidth = computed({
		get: () => _canvasWidth.value,
		set: (value: number | string) => {
			if (value as string === '100%') {
				_canvasWidth.value = parseFloat(resizeRef.value?.clientWidth || 0)
			} else {
				_canvasWidth.value = parseFloat(value as string)
			}
		}
	})

	const _dotPosition = ref({x: 0, y: 0})
	const dotPosition = computed({
		get: () => _dotPosition.value,
		set (val) {
			if (!canvasRef.value) return

			const {x, y} = val
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
		const {x, y} = dotPosition.value
		const radius = int(props.dotSize as string) / 2

		return {
			width: convertToUnit(props.dotSize),
			height: convertToUnit(props.dotSize),
			transform: `translate(${convertToUnit(x - radius)}, ${convertToUnit(y - radius)})`
		}
	})

	const updateDotPosition = (x: number, y: number, rect: DOMRect) => {
		const {left, top, width, height} = rect

		dotPosition.value = {
			x: clamp(x - left, 0, width),
			y: clamp(y - top, 0, height)
		}
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

	watch(() => props.colorHsv?.h, () => {
		updateCanvas()
	}, {immediate: true})

	watch(() => [canvasWidth.value, canvasHeight.value], (newVal, oldVal) => {
		updateCanvas()

		if (newVal[0] && oldVal[0] && newVal[1] && oldVal[1]) {
			_dotPosition.value = {
				x: dotPosition.value.x * newVal[0] / oldVal[0],
				y: dotPosition.value.y * newVal[1] / oldVal[1]
			}
		}
	}, {flush: 'post'})

	watch(() => props.colorHsv, () => {
		if (isInteracting.value) {
			isInteracting.value = false
			return
		}

		_dotPosition.value = props.colorHsv ? {
			x: props.colorHsv.s * canvasWidth.value,
			y: (1 - props.colorHsv.v) * canvasHeight.value
		} : {x: 0, y: 0}
	}, {deep: true, immediate: true})

	onMounted(() => {
		updateCanvas()

		canvasHeight.value = int(props.height)
		canvasWidth.value = int(props.width)

		_dotPosition.value = props.colorHsv ? {
			x: props.colorHsv.s * canvasWidth.value,
			y: (1 - props.colorHsv.v) * canvasHeight.value
		} : {x: 0, y: 0}
	})

	// CLASS & STYLES

	const colorPickerCanvasStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const colorPickerCanvasClasses = computed(() => {
		return [
			'origam-color-picker-canvas',
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
	.origam-color-picker-canvas {
		$this: &;

		display: flex;
		position: relative;
		overflow: hidden;
		contain: content;
		touch-action: none;

		&__dot {
			position: absolute;
			top: 0;
			left: 0;
			width: 15px;
			height: 15px;
			background: transparent;
			border-radius: 50%;
			box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1.5px #0000004d;

			&--disabled {
				box-shadow: 0 0 0 1.5px #ffffffb3, inset 0 0 1px 1.5px #0000004d
			}
		}

		&:hover {
			#{$this}__dot {
				will-change: transform;
			}
		}
	}
</style>
