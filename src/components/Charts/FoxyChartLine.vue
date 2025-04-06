<template>
	<svg
			:stroke-width="parseFloat(props.lineWidth) ?? 4"
			display="block"
	>
		<defs>
			<linearGradient
					:id="id"
					:x1="gradientDirection === 'left' ? '100%' : '0'"
					:x2="gradientDirection === 'right' ? '100%' : '0'"
					:y1="gradientDirection === 'top' ? '100%' : '0'"
					:y2="gradientDirection === 'bottom' ? '100%' : '0'"
					gradientUnits="userSpaceOnUse"
			>
				<template
						v-for="(color, index) in gradientData"
						:key="index"
				>
					<stop
							:offset="index / (Math.max(gradientData.length - 1, 1))"
							:stop-color="color || 'currentColor'"
					/>
				</template>
			</linearGradient>
		</defs>

		<template v-if="hasLabels">
			<g
					key="labels"
					:style="{ textAnchor: 'middle', dominantBaseline: 'mathematical', fill: 'currentColor'}"
			>
				<template
						v-for="(item, i) in parsedLabels"
						:key="i"
				>
					<text
							:font-size="Number(props.labelSize) || 7"
							:x="item.x + (lineWidth / 2) + lineWidth / 2"
							:y="(int(props.height, 10) - 4) + (int(props.labelSize, 10) || 7 * 0.75)"
					>
						<slot
								name="label"
								v-bind="{ index: i, value: item }"
						>
							{{ item }}
						</slot>
					</text>
				</template>
			</g>
		</template>

		<path
				ref="pathRef"
				:d="generatePath(fill)"
				:fill="fill ? `url(#${id})` : 'none'"
				:stroke="fill ? 'none' : `url(#${id})`"
		/>

		<template v-if="fill">
			<path
					:d="generatePath(false)"
					:stroke="color ? color : gradient?.[0]"
					fill="none"
			/>
		</template>
	</svg>
</template>

<script
		lang="ts"
		setup
>
	import { BLOCK } from "@foxy/enums"

	import { IBoundary, IChartLineProps, IPoint } from "@foxy/interfaces"

	import { genPath, getPropertyFromItem, getUid, int } from "@foxy/utils"

	import { computed, nextTick, ref, useSlots, watch } from "vue"

	const props = withDefaults(defineProps<IChartLineProps>(), {
		autoDrawEasing: "ease",
		gradientDirection: BLOCK.TOP,
		height: 75,
		labelSize: 7,
		lineWidth: 4,
		itemValue: 'value',
		padding: 8,
		width: 300,
		modelValue: () => []
	})

	const slots = useSlots()

	const uid = getUid()
	const id = computed(() => {
		return props.id || `chartLine-${uid}`
	})
	const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || (props.fill ? 500 : 2000))

	const lastLength = ref(0)
	const pathRef = ref<SVGPathElement | null>(null)

	const items = computed(() => {
		return props.modelValue.map((item) => getPropertyFromItem(item, props.itemValue, item))
	})

	const totalWidth = computed(() => {
		return Number(props.width)
	})
	const lineWidth = computed(() => {
		return parseFloat(props.lineWidth) || 4
	})

	const boundary = computed<IBoundary>(() => {
		const padding = Number(props.padding)

		return {
			minX: padding,
			maxX: totalWidth.value - padding,
			minY: padding,
			maxY: int(props.height) - padding
		}
	})

	const gradientData = computed(() => {
		return !props.gradient?.slice().length ? [''] : props.gradient?.slice().reverse()
	})

	const generatePoints = (
			values: number[],
			boundary: IBoundary
	): IPoint[] => {
		const {minX, maxX, minY, maxY} = boundary
		const totalValues = values.length
		const maxValue = props.max != null ? Number(props.max) : Math.max(...values)
		const minValue = props.min != null ? Number(props.min) : Math.min(...values)

		const gridX = (maxX - minX) / (totalValues - 1)
		const gridY = (maxY - minY) / ((maxValue - minValue) || 1)

		return values.map((value, index) => {
			return {
				x: minX + index * gridX,
				y: maxY - (value - minValue) * gridY,
				value
			}
		})
	}
	const generatePath = (fill?: boolean) => {
		const smoothValue = typeof props.smooth === 'boolean' ? (props.smooth ? 8 : 0) : Number(props.smooth)

		return genPath(
				generatePoints(items.value, boundary.value),
				smoothValue,
				fill,
				int(props.height)
		)
	}

	const hasLabels = computed(() => {
		return Boolean(
				props.showLabels ||
				(props.labels && props.labels?.length > 0) ||
				slots.label
		)
	})
	const parsedLabels = computed(() => {
		const labels = []
		const points = generatePoints(items.value, boundary.value)
		const len = points.length

		for (let i = 0; labels.length < len; i++) {
			const item = points[i]
			let value = props.labels?.[i]

			if (!value) {
				value = typeof item === 'object'
						? item.value
						: item
			}

			labels.push({
				x: item.x,
				value: String(value)
			})
		}

		return labels
	})

	watch(() => props.modelValue, async () => {
		await nextTick()

		if (!props.autoDraw || !pathRef.value) return

		const path = pathRef.value
		const length = path.getTotalLength()

		if (!props.fill) {
			// Initial setup to "hide" the line by using the stroke dash array
			path.style.strokeDasharray = `${length}`
			path.style.strokeDashoffset = `${length}`

			// Force reflow to ensure the transition starts from this state
			path.getBoundingClientRect()

			// Animate the stroke dash offset to "draw" the line
			path.style.transition = `stroke-dashoffset ${autoDrawDuration.value}ms ${props.autoDrawEasing}`
			path.style.strokeDashoffset = '0'
		} else {
			// Your existing logic for filled paths remains the same
			path.style.transformOrigin = 'bottom center'
			path.style.transition = 'none'
			path.style.transform = `scaleY(0)`
			path.getBoundingClientRect()
			path.style.transition = `transform ${autoDrawDuration.value}ms ${props.autoDrawEasing}`
			path.style.transform = `scaleY(1)`
		}

		lastLength.value = length
	}, {immediate: true})
</script>

<style
		lang="scss"
		scoped
>

</style>

<style>
	:root {

	}
</style>
